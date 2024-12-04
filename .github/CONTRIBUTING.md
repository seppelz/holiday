# Contributing to Holiday Planner

## 🚀 Quick Reference

### Common Commands
```bash
# Project Board
gh project view 3 --owner seppelz

# Issues
gh issue create --title "Title" --body "Description" --label "high-priority"
gh issue list --label "high-priority"
gh issue view 123

# Development
npm run dev     # Start development server
npm run test    # Run tests
npm run lint    # Check linting
```

### Key Files Quick Access
- 📅 Calendar: `src/components/Calendar/Calendar.tsx`
- 🎨 UI: `src/components/Desktop/Calendar/DesktopCalendar.tsx`
- 📊 Data: `src/data/holidays.ts` (main holiday data source)
- 🔧 Services: `src/services/holidayService.ts`
- 📝 Types: `src/types/holiday.ts`
- 🔄 Scripts: `src/scripts/fetchHolidays.mjs` (for updating holiday data)
- 🧪 Tests: 
  - `src/components/VacationList.test.tsx`
  - `src/utils/smartVacationAnalysis.test.ts`
  - `src/services/__tests__/bridgeDayService.test.ts`

### Holiday Data Management
The project uses a centralized holiday data source in `holidays.ts` containing all public, school, and regional holidays for 2024-2026. To update or extend the data:

1. Use the fetch scripts:
```bash
node src/scripts/fetchHolidays.mjs
```

2. Review and merge the new data into `holidays.ts`
3. Run tests to ensure data consistency
4. Update documentation if new years/states are added

### Current Focus
- State-specific holiday handling
- Bridge day calculation improvements
- Test coverage expansion
- Documentation updates

## Quick Start for Development Sessions

### 1. GitHub Access Setup
```bash
# Add to .env.local:
GH_TOKEN=your_token

# Verify access:
gh auth status
```

### 2. Project Board Access
- Project ID: `PVT_kwHOAEVDoc4AtXxZ`
- Status Field ID: `PVTSSF_lAHOAEVDoc4AtXxZzgkJLUk`
- Done Status Option ID: `98236657`

View all items:
```bash
gh api graphql -f query='query { 
  user(login: "seppelz") { 
    projectV2(number: 3) { 
      items(first: 100) { 
        nodes { 
          id 
          content { 
            ... on Issue { 
              number 
              title 
              state 
            } 
          } 
        } 
      } 
    } 
  } 
}'
```

## Project Management Structure

### Milestones
1. **Core Features** ✅
   - Bridge day calculations
   - Holiday management
   - State-specific features
   - Vacation efficiency analysis

2. **Enhanced Features** ✅
   - Multi-state support
   - Extended date range (2024-2026)
   - Improved efficiency calculations
   - Chronological sorting

3. **Testing & Documentation** 🚧
   - Component tests
   - Integration tests
   - Updated documentation
   - Type safety improvements

4. **UI/UX & Performance** 🚧
   - Mobile optimization
   - Enhanced UI/UX
   - Performance improvements
   - Export functionality

### Project Board Workflow
1. **Columns**
   - 📋 Todo: Planned and ready for development
   - 🚧 In Progress: Currently being worked on
   - ✅ Done: Completed and verified

2. **Moving Issues**
   ```bash
   # Move to Done
   gh api graphql -f query='mutation { 
     updateProjectV2ItemFieldValue(
       input: { 
         projectId: "PVT_kwHOAEVDoc4AtXxZ" 
         itemId: "$ITEM_ID" 
         fieldId: "PVTSSF_lAHOAEVDoc4AtXxZzgkJLUk" 
         value: { 
           singleSelectOptionId: "98236657" 
         } 
       }
     ) { 
       projectV2Item { 
         id 
       } 
     } 
   }'
   ```

### Issue Management

#### Labels
- `high-priority`: Urgent tasks needing immediate attention
- `bug`: Issues affecting functionality
- `enhancement`: New features or improvements
- `documentation`: Documentation updates
- `testing`: Testing-related tasks
- `state-specific`: Issues related to state handling
- `bridge-day`: Bridge day calculation issues

#### Issue Creation
1. Use appropriate template from `.github/ISSUE_TEMPLATE/`
2. Assign to relevant milestone
3. Add appropriate labels
4. Link related issues with `Relates to #X`

#### Issue Resolution
1. Move to Done via Project Board
2. Reference the resolving commit/PR
3. Update related documentation if needed
4. Update tests if functionality changed

## Development Guidelines

### Code Style
- Follow existing TypeScript configurations
- Use Prettier for formatting
- Follow React best practices
- Mobile-first approach for UI components
- Maintain type safety across components
- Document complex calculations
- Add comprehensive tests for new features

### Git Workflow
1. Create feature branch from main
2. Use conventional commits
3. Reference issues in commits
4. Create PR with template
5. Request review when ready
6. Ensure tests pass
7. Update documentation

### Testing Requirements
- Write tests for new features
- Update existing tests when modifying code
- Ensure all tests pass before PR
- Key test files to maintain:
  - VacationList.test.tsx
  - smartVacationAnalysis.test.ts
  - bridgeDayService.test.ts

## Documentation Updates

### When to Update Documentation
- New features added
- Workflows changed
- Dependencies updated
- Project structure modified
- State handling changes
- Holiday data updates

### Where to Update
1. `README.md` - Project overview and features
2. `handover.md` - Development state and recent changes
3. `CONTRIBUTING.md` - Process changes
4. Code comments - Implementation details
5. `CHANGELOG.md` - Version history

## Support and Communication
- Use issue comments for technical discussions
- Update project board regularly
- Keep documentation current
- Report state-specific issues with clear examples
- Include test cases for bug reports