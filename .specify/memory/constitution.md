<!--
Sync Impact Report
Version change: 1.1.0 -> 1.2.0
Modified principles: II. Test-First Verification; III. UX Consistency;
V. Documentation & Repository Hygiene
Added sections: VI. Scope Ownership & Reuse Boundaries
Removed sections: none
Templates requiring updates: .specify/templates/plan-template.md (updated),
.specify/templates/spec-template.md (updated),
.specify/templates/tasks-template.md (updated)
Deferred items: none
-->

# Duotify Membership Constitution

## Core Principles

### I. Code Quality & Maintainability
Code must be easy to read, review, and change. New code must use clear naming,
small units of responsibility, minimal coupling, and the simplest viable
structure for the requirement at hand. Any intentional complexity must be
justified in the plan or specification, and externally visible behavior must be
covered by tests or contract examples before the work is considered complete.

### II. Test-First Verification
Changes must be verified by tests before they are considered complete whenever
automated testing is feasible. Bug fixes must reproduce the failure before the
fix is applied. New behavior must include the most appropriate test coverage
for its surface area, and tests must be deterministic enough to run reliably in
automation. Legal default states, empty states, hidden states, and placeholder
states must never cause runtime errors, render failures, or browser console
errors. Each primary route and each high-risk interactive component must
include at least one smoke test that verifies successful initial render under
default conditions. Plans, tasks, and tests must encode both positive
ownership and negative ownership so that assigned surfaces prove presence and
unassigned surfaces prove absence.

### III. UX Consistency
User-facing experiences must preserve the product's established terminology,
tone, layout patterns, and interaction model. Shared styles, layout primitives,
and reusable UI abstractions may only be applied where visual behavior and
layout requirements are materially the same. Convenience or implementation
speed must never justify forcing a screen or component into a shared style
system that contradicts its explicit specification. When a route, view, or
component has explicit layout or sizing rules, those rules take precedence over
reusable abstractions. Loading, empty, error, and success states must be
designed with the same level of care as the primary path, and accessibility
basics must not be regressed.

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
untracked unless a strong product reason is documented and approved in the
specification or maintenance task.

### VI. Scope Ownership & Reuse Boundaries
Features must only appear in the routes, views, components, and surfaces that
the specification or clarifications explicitly assign to them. Shared state,
shared data sources, or reusable logic do not imply shared UI. When a feature
is assigned to specific surfaces, all other surfaces are out of scope by
default unless the specification explicitly includes them. Plans, tasks, and
tests must record both where the feature must appear and where it must not
appear. Reuse must never override route-specific or component-specific
requirements.

## Additional Constraints

Documentation and implementation must stay aligned. If a change alters user
behavior, data shape, performance characteristics, ownership boundaries, or
test strategy, the corresponding specification and plan must be updated in the
same work item. When the repository uses linting, formatting, type checking,
or CI validation, those checks must pass before the change is accepted.

## Development Workflow

Every meaningful change must be traceable to a specification or explicit
maintenance task. Test coverage must be added or updated with the smallest
useful scope that proves the change. Reviewers must verify that language,
testing, performance, scope ownership, reusable-style boundaries, and
repository hygiene requirements are satisfied before merge.

## Governance

This constitution overrides informal conventions, ad hoc practices, and
conflicting local guidance. Amendments require an explicit update to this file,
version incrementing, and a brief rationale in the sync report. Versioning uses
semantic rules: MAJOR for incompatible governance changes, MINOR for new
principles or materially expanded guidance, and PATCH for clarifications or
wording fixes. Compliance review is mandatory for all specs, plans, and
implementation changes, and any exception must be documented with a clear
expiration or remediation path.

**Version**: 1.2.0 | **Ratified**: 2026-03-21 | **Last Amended**: 2026-03-23
