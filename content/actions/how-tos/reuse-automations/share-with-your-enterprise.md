---
title: Sharing actions and workflows with your enterprise
intro: You can share an action or reusable workflow with your enterprise without publishing the action or workflow publicly.
versions:
  ghec: '*'
  ghes: '*'
type: tutorial
topics:
  - Actions
  - Action development
shortTitle: Share with your enterprise
redirect_from:
  - /actions/creating-actions/sharing-actions-and-workflows-with-your-enterprise
  - /actions/sharing-automations/sharing-actions-and-workflows-with-your-enterprise
  - /actions/how-tos/sharing-automations/sharing-actions-and-workflows-with-your-enterprise
---

## Overview

If your organization is owned by an enterprise account, you can share actions and reusable workflows within your enterprise, without publishing them publicly, by allowing {% data variables.product.prodname_actions %} workflows to access an internal or private repository that contains the action or reusable workflow.

Any actions or reusable workflows stored in the internal or private repository can be used in workflows defined in other internal or private repositories owned by the same organization, or by any organization owned by the enterprise. Actions and reusable workflows stored in internal repositories cannot be used in public repositories and actions and reusable workflows stored in private repositories cannot be used in public or internal repositories.

> [!WARNING]
> * {% data reusables.actions.outside-collaborators-actions %}
> * {% data reusables.actions.scoped-token-note %}

## Sharing actions and workflows with your enterprise

1. Store the action or reusable workflow in an internal or private repository. For more information, see [AUTOTITLE](/repositories/creating-and-managing-repositories/about-repositories).
1. Configure the repository to allow access to workflows in other internal or private repositories. For more information, see [AUTOTITLE](/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#allowing-access-to-components-in-a-private-repository) and [AUTOTITLE](/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#allowing-access-to-components-in-an-internal-repository).

## Further reading

* [AUTOTITLE](/admin/overview/about-enterprise-accounts)
* [AUTOTITLE](/actions/using-workflows/reusing-workflows)
