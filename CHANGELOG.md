# Changelog

All notable changes to the Holiday Planner project will be documented in this file.

## [1.1.0] - 2024-03

### Added
- Extended bridge day recommendations beyond June 2025 (now showing 2024-2026)
- Improved state-specific holiday filtering
- Enhanced vacation efficiency calculations
- Chronological sorting of recommendations
- Better date range display in recommendations
- Streamlined UI with single recommendation view
- Comprehensive test coverage for core components

### Fixed
- Bridge day calculation logic for accurate recommendations
- State parameter handling across components
- Vacation list updates and state management
- Date range calculations in recommendations
- Import paths and component integration
- Type issues with holiday filtering

### Changed
- Moved filtering logic to VacationList component
- Improved sorting mechanism for chronological display
- Simplified UI by removing duplicate recommendations
- Updated documentation to reflect current state
- Enhanced state management in MainLayout

### Technical
- Added VacationList.test.tsx
- Added smartVacationAnalysis.test.ts
- Updated bridgeDayService.test.ts
- Improved type safety across components
- Enhanced error handling and state validation 