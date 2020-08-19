# Integration Tests

This directory contains integration tests or example component usage that might be too advanced for the `examples`
directory, whose pages are compiled into the demo/prototyping page.

By "too advanced", I mean:
* The intent may be _verification_ rather than _demonstration_. For example, in some cases, although this library
  does not provide or prescribe a particular JavaScript runtime, some component styles may be designed with certain
  JavaScript support in mind. For instance, the [tooltip styles are verified to work with Popper.js](tooltip.html),
  although Popper.js is not a strict dependency.
* The JavaScript runtime required to support a particular component may be more substantial than what can be attached to
  elements via attributes like `onclick`. For instance, the [details component](details.html) requires quite a bit of
  JavaScript code to provide fully-functional animations.
* The page may host a more advanced component integration example than we want to show on the demo/prototyping page.

Perhaps we could consider solving these problems some other way at a point in the future, but it would add significant
complexity that we don't have time to tackle right now.
