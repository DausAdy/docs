---
title: Creating a custom security configuration
shortTitle: Create custom configuration
intro: 'Build a {% data variables.product.prodname_custom_security_configuration %} to meet the specific security needs of repositories in your organization.'
permissions: '{% data reusables.permissions.security-org-enable %}'
versions:
  feature: security-configurations
topics:
  - Code Security
  - Secret Protection
  - Organizations
  - Security
redirect_from:
  - /code-security/securing-your-organization/meeting-your-specific-security-needs-with-custom-security-configurations/creating-a-custom-security-configuration
---

## About {% data variables.product.prodname_custom_security_configurations %}

{% ifversion fpt or ghec %}

We recommend securing your organization with the {% data variables.product.prodname_github_security_configuration %}, then evaluating the security findings on your repositories before configuring {% data variables.product.prodname_custom_security_configurations %}. For more information, see [AUTOTITLE](/code-security/securing-your-organization/enabling-security-features-in-your-organization/applying-the-github-recommended-security-configuration-in-your-organization).

{% endif %}

With {% data variables.product.prodname_custom_security_configurations %}, you can create collections of enablement settings for {% data variables.product.company_short %}'s security products to meet the specific security needs of your organization. For example, you can create a different {% data variables.product.prodname_custom_security_configuration %} for each group of repositories to reflect their different levels of visibility, risk tolerance, and impact.

{% ifversion ghas-products %}

You can also choose whether or not you want to include {% data variables.product.prodname_GH_code_security %} or {% data variables.product.prodname_GH_secret_protection %} features in a configuration.

{%- ifversion fpt or ghec %} If you do, keep in mind that these features incur usage costs (or require {% data variables.product.prodname_GHAS %} licenses) when applied to private and internal repositories.{% endif %} For more information, see [AUTOTITLE](/get-started/learning-about-github/about-github-advanced-security).

{% endif %}

{% ifversion ghes %}

* Only features installed by a site administrator on your {% data variables.product.prodname_ghe_server %} instance will appear in the UI.
* {% ifversion ghas-products %}Some features will only be visible if your organization or {% data variables.product.prodname_ghe_server %} instance has purchased the relevant {% data variables.product.prodname_GHAS %} product ({% data variables.product.prodname_GH_code_security %} or {% data variables.product.prodname_GH_secret_protection %}){% else %}{% data variables.product.prodname_GHAS %} features will only be visible if your organization or {% data variables.product.prodname_ghe_server %} instance holds a {% data variables.product.prodname_GHAS %} license{% endif %}.
* Certain features, like {% data variables.product.prodname_dependabot_security_updates %} and {% data variables.product.prodname_code_scanning %} default setup, also require that {% data variables.product.prodname_actions %} is installed on the {% data variables.product.prodname_ghe_server %} instance.{% endif %}

{% ifversion ghas-products %}

{% data reusables.advanced-security.bundled-vs-unbundled-ui %} See [Creating a {% data variables.product.prodname_GHAS %} configuration](#creating-a-github-advanced-security-configuration) or [Creating a {% data variables.product.prodname_cs_and_sp %} configuration](#creating-a-secret-protection-and-code-security-configuration).

## Creating a {% data variables.product.prodname_cs_and_sp %} configuration

<!-- This section describes the view for users with an unbundled GHAS license. That is, separate calculation of usage of Secret Protection and Code Security features. -->

{% data reusables.profile.access_org %}
{% data reusables.organizations.org_settings %}
{% data reusables.security-configurations.view-configurations-page %}
1. In the "{% data variables.product.prodname_security_configurations_caps %}" section, click **New configuration**.
1. To help identify your {% data variables.product.prodname_custom_security_configuration %} and clarify its purpose on the "{% data variables.product.prodname_security_configurations_caps %}" page, name your configuration and create a description.
1. Optionally, enable "{% data variables.product.prodname_secret_protection %}", a paid feature for private {% ifversion ghec %}and internal {% endif %} repositories. Enabling {% data variables.product.prodname_secret_protection %} enables alerts for {% data variables.product.prodname_secret_scanning %}. In addition, you can choose whether to enable, disable, or keep the existing settings for the following {% data variables.product.prodname_secret_scanning %} features:
    {% ifversion secret-scanning-validity-check-partner-patterns %}
    * **Validity checks**. To learn more about validity checks for partner patterns, see [AUTOTITLE](/code-security/secret-scanning/managing-alerts-from-secret-scanning/evaluating-alerts#checking-a-secrets-validity).{% endif %}{% ifversion org-npp-enablement-security-configurations %}
    * **Non-provider patterns**. To learn more about scanning for non-provider patterns, see [AUTOTITLE](/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#non-provider-patterns) and [AUTOTITLE](/code-security/secret-scanning/managing-alerts-from-secret-scanning/viewing-alerts).{% endif %}{% ifversion secret-scanning-ai-generic-secret-detection %}
    * **Scan for generic passwords**. To learn more, see [AUTOTITLE](/code-security/secret-scanning/copilot-secret-scanning/responsible-ai-generic-secrets).{% endif %}
    * **Push protection**. To learn about push protection, see [AUTOTITLE](/code-security/secret-scanning/introduction/about-push-protection).{% ifversion push-protection-delegated-bypass-configurations %}
    * **Bypass privileges**. By assigning bypass privileges, selected organization members can bypass push protection, and there is a review and approval process for all other contributors. See [AUTOTITLE](/code-security/secret-scanning/using-advanced-secret-scanning-and-push-protection-features/delegated-bypass-for-push-protection/about-delegated-bypass-for-push-protection).{% endif %}{% ifversion security-delegated-alert-dismissal %}
    * **Prevent direct alert dismissals**. To learn more, see [AUTOTITLE](/code-security/secret-scanning/using-advanced-secret-scanning-and-push-protection-features/enabling-delegated-alert-dismissal-for-secret-scanning).{% endif %}
1. Optionally, enable "{% data variables.product.prodname_code_security %}", a paid feature for private {% ifversion ghec %}and internal {% endif %} repositories. You can choose whether to enable, disable, or keep the existing settings for the following {% data variables.product.prodname_code_scanning %} features:
   * **Default setup**. To learn more about default setup, see [AUTOTITLE](/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning#about-default-setup).
      {% data reusables.code-scanning.enable-default-setup-allow-advanced-setup-note %}{% ifversion code-scanning-default-setup-customize-labels %}
   * **Runner type**. If you want to target specific runners for {% data variables.product.prodname_code_scanning %}, you can choose to use custom-labeled runners at this step. See [AUTOTITLE](/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning#assigning-labels-to-runners).{% endif %} {% ifversion security-delegated-alert-dismissal %}
    * **Prevent direct alert dismissals**. To learn more, see [AUTOTITLE](/code-security/code-scanning/managing-your-code-scanning-configuration/enabling-delegated-alert-dismissal-for-code-scanning).{% endif %}
1. Still under "{% data variables.product.prodname_code_security %}", in the "Dependency scanning" table, choose whether you want to enable, disable, or keep the existing settings for the following dependency scanning features:
   * **Dependency graph**. To learn about dependency graph, see [AUTOTITLE](/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph).
      > [!TIP]
      > When both "{% data variables.product.prodname_code_security %}" and Dependency graph are enabled, this enables dependency review, see [AUTOTITLE](/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review).{%- ifversion maven-transitive-dependencies %}
   * **Automatic dependency submission**. To learn about automatic dependency submission, see [AUTOTITLE](/code-security/supply-chain-security/understanding-your-software-supply-chain/configuring-automatic-dependency-submission-for-your-repository).{%- endif %}
   * **{% data variables.product.prodname_dependabot %} alerts**. To learn about {% data variables.product.prodname_dependabot %}, see [AUTOTITLE](/code-security/dependabot/dependabot-alerts/about-dependabot-alerts).
   * **Security updates**. To learn about security updates, see [AUTOTITLE](/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates).{% ifversion fpt or ghec %}
1. For "Private vulnerability reporting", choose whether you want to enable, disable, or keep the existing settings. To learn about private vulnerability reporting, see [AUTOTITLE](/code-security/security-advisories/working-with-repository-security-advisories/configuring-private-vulnerability-reporting-for-a-repository).{% endif %}
1. Optionally, in the "Policy" section, you can use additional options to control how the configuration is applied:
   * **Use as default for newly created repositories**. Select the **None** {% octicon "triangle-down" aria-hidden="true" aria-label="triangle-down" %} dropdown menu, then click **Public**, **Private and internal**, or **All repositories**.
        {% data reusables.security-configurations.default-configuration-exception-repo-transfers %}
   * **Enforce configuration**. Block repository owners from changing features that are enabled or disabled by the configuration (features that are not set aren't enforced). Select **Enforce** from the dropdown menu.

1. To finish creating your {% data variables.product.prodname_custom_security_configuration %}, click **Save configuration**.

{% data reusables.code-scanning.custom-security-configuration-enforcement-edge-cases-enterprise %}

## Creating a {% data variables.product.prodname_GHAS %} configuration

<!-- This section describes the view for users with an bundled GHAS license. That is, a single calculation of usage of any GitHub Advanced Security features. -->

{% data reusables.profile.access_org %}
{% data reusables.organizations.org_settings %}
{% data reusables.security-configurations.view-configurations-page %}
1. In the "Security configurations" section, click **New configuration**.
1. To help identify your {% data variables.product.prodname_custom_security_configuration %} and clarify its purpose on the "New configuration" page, name your configuration and create a description.
1. In the "{% data variables.product.prodname_GHAS %} features" row, choose whether to include or exclude {% data variables.product.prodname_GHAS %} (GHAS) features.
1. In the "{% data variables.product.prodname_secret_scanning_caps %}" table, choose whether you want to enable, disable, or keep the existing settings for the following security features:{% ifversion ghes > 3.16 %}
    * **Alerts**. To learn about {% data variables.secret-scanning.alerts %}, see [AUTOTITLE](/code-security/secret-scanning/introduction/about-secret-scanning).{% endif %} {% ifversion secret-scanning-validity-check-partner-patterns %}
    * **Validity checks**. To learn more about validity checks for partner patterns, see [AUTOTITLE](/code-security/secret-scanning/managing-alerts-from-secret-scanning/evaluating-alerts#checking-a-secrets-validity).{% endif %}{% ifversion org-npp-enablement-security-configurations %}
    * **Non-provider patterns**. To learn more about scanning for non-provider patterns, see [AUTOTITLE](/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#non-provider-patterns) and [AUTOTITLE](/code-security/secret-scanning/managing-alerts-from-secret-scanning/viewing-alerts).{% endif %}{% ifversion secret-scanning-ai-generic-secret-detection %}
    * **Scan for generic passwords**. To learn more, see [AUTOTITLE](/code-security/secret-scanning/copilot-secret-scanning/responsible-ai-generic-secrets).{% endif %}
    * **Push protection**. To learn about push protection, see [AUTOTITLE](/code-security/secret-scanning/introduction/about-push-protection).{% ifversion push-protection-delegated-bypass-configurations %}
    * **Bypass privileges**. By assigning bypass privileges, selected organization members can bypass push protection, and there is a review and approval process for all other contributors. See [AUTOTITLE](/code-security/secret-scanning/using-advanced-secret-scanning-and-push-protection-features/delegated-bypass-for-push-protection/about-delegated-bypass-for-push-protection).{% endif %}{% ifversion security-delegated-alert-dismissal %}
    * **Prevent direct alert dismissals**. To learn more, see [AUTOTITLE](/code-security/secret-scanning/using-advanced-secret-scanning-and-push-protection-features/enabling-delegated-alert-dismissal-for-secret-scanning).{% endif %}
1. In the "{% data variables.product.prodname_code_scanning_caps %}" table, choose whether you want to enable, disable, or keep the existing settings for {% data variables.product.prodname_code_scanning %} default setup.
   * **Default setup**. To learn more about default setup, see [AUTOTITLE](/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning#about-default-setup).
      {% data reusables.code-scanning.enable-default-setup-allow-advanced-setup-note %}{% ifversion code-scanning-default-setup-customize-labels %}
   * **Runner type**. If you want to target specific runners for {% data variables.product.prodname_code_scanning %}, you can choose to use custom-labeled runners at this step. See [AUTOTITLE](/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning#assigning-labels-to-runners).{% endif %} {% ifversion security-delegated-alert-dismissal %}
    * **Prevent direct alert dismissals**. To learn more, see [AUTOTITLE](/code-security/code-scanning/managing-your-code-scanning-configuration/enabling-delegated-alert-dismissal-for-code-scanning).{% endif %}
1. In the "Dependency scanning" table, choose whether you want to enable, disable, or keep the existing settings for the following dependency scanning features:
   * **Dependency graph**. To learn about dependency graph, see [AUTOTITLE](/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph).
      > [!TIP]
      > When both "{% data variables.product.prodname_GHAS %}" and Dependency graph are enabled, this enables dependency review, see [AUTOTITLE](/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review).{%- ifversion maven-transitive-dependencies %}
   * **Automatic dependency submission**. To learn about automatic dependency submission, see [AUTOTITLE](/code-security/supply-chain-security/understanding-your-software-supply-chain/configuring-automatic-dependency-submission-for-your-repository).{%- endif %}
   * **{% data variables.product.prodname_dependabot %} alerts**. To learn about {% data variables.product.prodname_dependabot %}, see [AUTOTITLE](/code-security/dependabot/dependabot-alerts/about-dependabot-alerts).
   * **Security updates**. To learn about security updates, see [AUTOTITLE](/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates).{% ifversion fpt or ghec %}
1. For "Private vulnerability reporting", choose whether you want to enable, disable, or keep the existing settings. To learn about private vulnerability reporting, see [AUTOTITLE](/code-security/security-advisories/working-with-repository-security-advisories/configuring-private-vulnerability-reporting-for-a-repository).{% endif %}
1. Optionally, in the "Policy" section, you can use additional options to control how the configuration is applied:
   * **Use as default for newly created repositories**. Select the **None** {% octicon "triangle-down" aria-hidden="true" aria-label="triangle-down" %} dropdown menu, then click **Public**, **Private and internal**, or **All repositories**.
        {% data reusables.security-configurations.default-configuration-exception-repo-transfers %}
   * **Enforce configuration**. Block repository owners from changing features that are enabled or disabled by the configuration (features that are not set aren't enforced). Select **Enforce** from the dropdown menu.

1. To finish creating your {% data variables.product.prodname_custom_security_configuration %}, click **Save configuration**.

{% else %}

<!--This section describes the view for users with GHES 3.15 and 3.16. -->

## Creating a {% data variables.product.prodname_custom_security_configuration %}

>[!NOTE]
> The enablement status of some security features is dependent on other, higher-level security features. For example, disabling {% data variables.secret-scanning.alerts %} will also disable non-provider patterns and push protection.

{% data reusables.profile.access_org %}
{% data reusables.organizations.org_settings %}
{% data reusables.security-configurations.view-configurations-page %}
1. In the "Code security configurations" section, click **New configuration**.
1. To help identify your {% data variables.product.prodname_custom_security_configuration %} and clarify its purpose on the "Code {% data variables.product.prodname_security_configurations %}" page, name your configuration and create a description.
1. In the "{% data variables.product.prodname_GHAS %} features" row, choose whether to include or exclude {% data variables.product.prodname_GHAS %} (GHAS) features. If you plan to apply a {% data variables.product.prodname_custom_security_configuration %} with GHAS features to repositories, you must have available GHAS licenses for each active unique committer to those repositories, or the features will not be enabled. See [AUTOTITLE](/billing/managing-billing-for-your-products/managing-billing-for-github-advanced-security/about-billing-for-github-advanced-security).
1. In the "Dependency graph and Dependabot" section of the security settings table, choose whether you want to enable, disable, or keep the existing settings for the following security features:
    * {% data variables.product.prodname_dependabot_alerts %}. To learn about {% data variables.product.prodname_dependabot %}, see [AUTOTITLE](/code-security/dependabot/dependabot-alerts/about-dependabot-alerts).
    * Security updates. To learn about security updates, see [AUTOTITLE](/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates).
    > [!NOTE]
    > You cannot manually change the enablement setting for the dependency graph. This setting is installed and managed by a site administrator at the instance level.
1. In the "{% data variables.product.prodname_code_scanning_caps %}" section of the security settings table, choose whether you want to enable, disable, or keep the existing settings for {% data variables.product.prodname_code_scanning %} default setup. To learn about default setup, see [AUTOTITLE](/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning#about-default-setup).
1. In the "{% data variables.product.prodname_secret_scanning_caps %}" section of the security settings table, choose whether you want to enable, disable, or keep the existing settings for the following security features:
    * Alerts. To learn about {% data variables.secret-scanning.alerts %}, see [AUTOTITLE](/code-security/secret-scanning/introduction/about-secret-scanning).{% ifversion org-npp-enablement-security-configurations %}
    * Non-provider patterns. To learn more about scanning for non-provider patterns, see [AUTOTITLE](/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#non-provider-patterns) and [AUTOTITLE](/code-security/secret-scanning/managing-alerts-from-secret-scanning/viewing-alerts).{% endif %}
    * Push protection. To learn about push protection, see [AUTOTITLE](/code-security/secret-scanning/introduction/about-push-protection).
{% ifversion push-protection-delegated-bypass-configurations %}
1. Optionally, under "Push protection", choose whether you want to assign bypass privileges to selected actors in your organization. By assigning bypass privileges, selected organization members can bypass push protection, and there is a review and approval process for all other contributors. For further guidance on how to configure this setting, see [AUTOTITLE](/code-security/secret-scanning/using-advanced-secret-scanning-and-push-protection-features/delegated-bypass-for-push-protection/enabling-delegated-bypass-for-push-protection#configuring-delegated-bypass-for-an-organization).
{% endif %}
1. Optionally, in the "Policy" section, you can choose to automatically apply the {% data variables.product.prodname_security_configuration %} to newly created repositories depending on their visibility. Select the **None** {% octicon "triangle-down" aria-hidden="true" aria-label="triangle-down" %} dropdown menu, then click **Public**, or **Private and internal**, or **All repositories**.

    {% data reusables.security-configurations.default-configuration-exception-repo-transfers %}
1. Optionally, in the "Policy" section, you can enforce the configuration and block repository owners from changing features that are enabled or disabled by the configuration (features that are not set aren't enforced). Next to "Enforce configuration", select **Enforce** from the dropdown menu.

    {% data reusables.code-scanning.custom-security-configuration-enforcement-edge-cases %}

1. To finish creating your {% data variables.product.prodname_custom_security_configuration %}, click **Save configuration**.

{% endif %}

## Next steps

To apply your {% data variables.product.prodname_custom_security_configuration %} to repositories in your organization, see [AUTOTITLE](/code-security/securing-your-organization/enabling-security-features-in-your-organization/applying-a-custom-security-configuration).

{% data reusables.security-configurations.edit-configuration-next-step %}
