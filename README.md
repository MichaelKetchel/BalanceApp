# The Balance App

This is the code-home of the Balance App--part refresher project, part everyday tool.

## The story
My brother and I live together, and as a result, many times find ourselves making shopping trips. While not sticklers
about it, we do like to keep our expenditures relatively balanced and fair, and manually zipping half the total back
and forth via Venmo or the like gets old fast, and complicates the checkbook.

We decided it'd be neat if we had an  app where we could just log who bought what, and letit automatically determine
our mutual "balance" so we always know who ought to buy groceries tonight. I'm a full-stack developer, and he's a
graphic designer, so we decided that since we didn't know of such an app, we should make one!

So that's what we're doing. Building that app, and adding features we think will make it useful to others, and for
larger groups. Imagine being able to tell at a glance who in your group has pitched in what? You live in an apartment
with 5 others? Yeah, we wanna support that.

I also really missed coding in React, so there's my other reason.

## Goals

* Be able to tell who has contributed what at a glance.
* Be able to intuitively support 2 to 10 or more people while still having a function UI
* Support a single user being involved in multiple "groups" for whatever purposes you might need them for.
* Eventually be a truly progressive web app, with support for home-screen installs and offline caching of actions.
* Make fewer Venmo transactions.
* Stay in Balance.

## To-Do

* Design a prettier UI
  * User Photos by expenses?
  * Shortened Names?
* Design some nice graphs
  * Over/under bar graph to show contributions relative to average per-person.
* Popup/toast notifications.
* Unit Tests
* Add prop checking.
* Maybe use redux for some internal state. Or just keep it in Firebase.
* Concept of a group "Owner" with more powers than regular users.
* Maybe some concept of being able to add a user partway through and not have them inherit responsibility for previous balance?
  * This may involve requiring a "true-up" to exempt them.
* Export/Import data (as an owner)
* Optional anonymous display of other user's contributions, so you stop worrying about how much Steve has pitched in.
* Logic to find "zero-points" so that you don't have to go waaaay back to the beginning for calculations.
* Support taking pictures of receipts and associating them with entries
* Categories!
* React-Native build/support
* Maybe move away from Firebase someday? Mongo? Meteor?


## Nifty Resources
* Useful tutorial for react-native-web: https://scotch.io/tutorials/build-mobile-friendly-web-apps-with-react-native-web
* Drop dead guide for using Firebase in React: https://css-tricks.com/intro-firebase-react/
---
Lovingly made by eMKode and CJKetchel

