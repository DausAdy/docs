---
title: About your personal dashboard
redirect_from:
  - /hidden/about-improved-navigation-to-commonly-accessed-pages-on-github
  - /articles/opting-into-the-public-beta-for-a-new-dashboard
  - /articles/about-your-personal-dashboard
  - /github/setting-up-and-managing-your-github-user-account/about-your-personal-dashboard
  - /github/setting-up-and-managing-your-github-user-account/managing-user-account-settings/about-your-personal-dashboard
  - /account-and-profile/setting-up-and-managing-your-github-user-account/managing-user-account-settings/about-your-personal-dashboard
  - /account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-personal-account-settings/about-your-personal-dashboard
intro: 'You can visit your personal dashboard to keep track of issues and pull requests you''re working on or following, navigate to your top repositories and team pages, stay updated on recent activities in organizations and repositories you''re subscribed to, and explore recommended repositories.'
versions:
  fpt: '*'
  ghes: '*'
  ghec: '*'
topics:
  - Accounts
shortTitle: Your personal dashboard
---

## Accessing your personal dashboard

Your personal dashboard is the first page you'll see when you sign in on {% data variables.product.github %}.

To access your personal dashboard once you're signed in, click the {% octicon "mark-github" aria-label="The github octocat logo" %} in the upper-left corner of any page.

## Finding your recent activity

In the "Recent activity" section of your news feed, you can quickly find and follow up with recently updated issues and pull requests you're working on. Under "Recent activity", you can preview up to 4 recent updates made in the last two weeks.

{% data reusables.dashboard.recent-activity-qualifying-events %}

## Finding your top repositories and teams

In the global navigation menu, you can access the top repositories and teams you use. To open the menu, select {% octicon "three-bars" aria-label="Open global navigation menu" %} at the top left of any page.

  ![Screenshot of the navigation bar on {% data variables.product.github %}. The "Open global navigation menu" icon is outlined in dark orange.](/assets/images/help/navigation/global-navigation-menu-icon.png)

The list of top repositories is automatically generated, and can include any repository you have interacted with, whether it's owned directly by your account or not. Interactions include making commits and opening or commenting on issues and pull requests. The list of top repositories cannot be edited, but repositories will drop off the list 1 year after you last interacted with them.

You can also find a list of your recently visited repositories, teams, and projects when you click into the search bar at the top of any page on {% data variables.product.github %}.

## Staying updated with activity from the community

{% ifversion feed %}

> [!NOTE]
> The new feed is currently in {% data variables.release-phases.public_preview %} and subject to change.

The feed is designed to help you discover relevant content from projects you follow, keep up with your friends and community members, and track recent activity in your communities.

You can use the **{% octicon "filter" aria-hidden="true" aria-label="filter" %} Filter** dropdown in the upper right corner to filter the feed to show only the exact event types you'd like to see. For example, you'll see updates when someone you follow:

* Stars a repository
* Follows another user
* Creates a public repository
* Opens an issue or pull request with `help wanted` or `good first issue` label on a repository you're watching
* Pushes commits to a repository you watch
* Forks a public repository
* Publishes a new release

{% else %}
The main section of your dashboard has two activity feeds:

* Following: Activity by people you follow and from repositories you watch.
* For you: Activity and recommendations based on your {% data variables.product.github %} network.

### Following feed

This feed shows activity from repositories and users you have shown a direct interest in, by following a user or watching a repository. For example, you'll see updates when a user you follow:

* Stars a repository.
* Follows another user.
* Creates a public repository.
* Opens an issue or pull request with "help wanted" or "good first issue" label on a repository you're watching.
* Pushes commits to a repository you watch.
* Forks a public repository.
* Publishes a new release.

For more information about following people and starring repositories, see [AUTOTITLE](/get-started/exploring-projects-on-github/following-people) and [AUTOTITLE](/get-started/exploring-projects-on-github/saving-repositories-with-stars).

### For you feed

> [!NOTE]
> This new tab is currently in {% data variables.release-phases.public_preview %} and subject to change.

This feed shows activity and recommendations based on your network on {% data variables.product.github %}. It's designed to provide updates that inspire you, keep you up-to-date, and help you find new communities you want to participate in. Your network includes:

* Repositories you have starred
* Repositories you've contributed to
* Users you follow or sponsor
* Users you've collaborated with
* Organizations you follow

{% endif %}

## Further reading

* [AUTOTITLE](/organizations/collaborating-with-groups-in-organizations/about-your-organization-dashboard)
