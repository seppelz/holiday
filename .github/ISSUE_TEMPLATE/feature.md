---
name: Dual State Bridge Days
about: Feature for finding optimal bridge days for two different states
title: 'Feature: Dual State Bridge Days'
labels: enhancement
assignees: ''
---

## Description
Add support for finding bridge days that work for two different states. This is particularly useful for:
- Couples living in different states
- People working across state borders
- Families planning visits between states

## Acceptance Criteria
- [ ] Add UI to select two states
- [ ] Modify bridge day service to handle two states
- [ ] Show bridge days that work for both states
- [ ] Calculate and display efficiency for combined states
- [ ] Highlight "unique opportunities" where holidays align particularly well
- [ ] Add tests for dual state functionality

## Technical Notes
- Extend `bridgeDayService.ts` to accept two states
- Add new type for dual state results
- Consider caching results for performance
- Update UI components to handle dual state selection
- Add new test cases for dual state scenarios

## Dependencies
- Requires basic bridge day calculation (#2)
- Requires state selection UI (#3)

## Priority
Medium-High (after basic functionality is complete)

## Estimated Effort
- Backend: 2-3 days
- Frontend: 1-2 days
- Testing: 1 day