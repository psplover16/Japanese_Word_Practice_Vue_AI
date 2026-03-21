<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles: replaced placeholders with five concrete principles
Added sections: Additional Constraints; Development Workflow
Removed sections: none
Templates requiring updates: .specify/templates/plan-template.md (updated), .specify/templates/spec-template.md (updated), .specify/templates/tasks-template.md (updated)
Deferred items: none
-->

# Duotify Membership Constitution

## Core Principles

### I. Code Quality & Maintainability
Code must be easy to read, review, and change. New code must use clear naming,
small units of responsibility, and minimal coupling. Any intentional
complexity must be justified in the plan or specification, and public behavior
must be covered by tests or contract examples.

### II. Test-First Verification
Changes must be verified by tests before they are considered complete whenever
automated testing is feasible. Bug fixes must reproduce the failure before the
fix is applied. New behavior must include the most appropriate test coverage
for its surface area, and tests must be deterministic enough to run reliably in
automation.

### III. UX Consistency
User-facing experiences must preserve the product's established terminology,
tone, layout patterns, and interaction model. New screens, flows, and messages
must reuse existing patterns before introducing new ones. Loading, empty,
error, and success states must be designed with the same level of care as the
primary path, and accessibility basics must not be regressed.

### IV. Performance Budgets
Any change that can affect latency, memory, render time, bundle size, or other
resource usage must define the expected performance impact. When a change
risks exceeding a budget, the implementation must include measurement,
mitigation, and explicit justification. Performance regressions are defects and
must be corrected before release.

### V. Documentation & Repository Hygiene
This constitution must remain in English only. All specifications, plans, and
user-facing documentation must be written in Traditional Chinese (zh-TW).
Every new project must include a `.gitignore` file at creation time.
`node_modules/` must never be committed to Git. Re-installable or
re-generatable artifacts such as `build/`, `dist/`, and `coverage/` must be
excluded from version control by default. Generated files should remain
untracked unless a strong product reason is documented.

## Additional Constraints

Documentation and implementation must stay aligned. If a change alters user
behavior, data shape, performance characteristics, or test strategy, the
corresponding specification and plan must be updated in the same work item.
When the repository uses linting, formatting, type checking, or CI validation,
those checks must pass before the change is accepted.

## Development Workflow

Every meaningful change must be traceable to a specification or explicit
maintenance task. Test coverage must be added or updated with the smallest
useful scope that proves the change. Reviewers must verify that language,
testing, performance, and repository hygiene requirements are satisfied before
merge.

## Governance

This constitution overrides informal conventions, ad hoc practices, and
conflicting local guidance. Amendments require an explicit update to this file,
version incrementing, and a brief rationale in the sync report. Versioning uses
semantic rules: MAJOR for incompatible governance changes, MINOR for new
principles or materially expanded guidance, and PATCH for clarifications or
wording fixes. Compliance review is mandatory for all specs, plans, and
implementation changes, and any exception must be documented with a clear
expiration or remediation path.

**Version**: 1.0.0 | **Ratified**: 2026-03-21 | **Last Amended**: 2026-03-21
