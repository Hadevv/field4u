# Configuration Dependabot et Merge Automatique

Ce document explique la configuration mise en place pour automatiser les mises à jour de dépendances avec Dependabot.

## 📁 Fichiers de Configuration

### `.github/dependabot.yml`

Configuration principale de Dependabot qui :

- Met à jour les dépendances npm chaque lundi à 9h
- Limite à 5 PRs ouvertes simultanément
- Groupe les mises à jour par type (patch, minor, major)
- Applique des labels automatiques
- Configure les reviewers et assignees

### `.github/workflows/auto-merge-dependabot.yml`

Workflow GitHub Actions qui :

- Détecte automatiquement les PRs créées par Dependabot
- Vérifie que tous les checks de statut passent
- Merge automatiquement les PRs avec la méthode "squash"
- Commente en cas d'échec du merge automatique

### `.github/workflows/ci.yml`

Workflow de CI/CD qui :

- Exécute ESLint et TypeScript check
- Build l'application
- Lance les tests
- Doit passer avant qu'un merge automatique soit autorisé

## 🔧 Configuration Requise dans GitHub

Pour que le merge automatique fonctionne, vous devez configurer les **branches protégées** dans GitHub :

1. Allez dans **Settings** > **Branches**
2. Ajoutez une règle pour la branche `main` (et `develop` si nécessaire)
3. Activez les options suivantes :

   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history
   - ✅ Include administrators

4. Dans "Status checks that are required", ajoutez :
   - `lint-and-typecheck`
   - `build`
   - `test`

## 🚀 Fonctionnement

1. **Dependabot** crée une PR avec les mises à jour de dépendances
2. **CI Workflow** vérifie que le code passe tous les tests
3. **Auto-merge Workflow** détecte la PR Dependabot et attend que les checks passent
4. Une fois tous les checks verts, la PR est automatiquement mergée avec un commit squash

## 📋 Labels et Métadonnées

Les PRs Dependabot reçoivent automatiquement :

- Label `dependencies`
- Label `automated`
- Reviewer : `ademe`
- Assignee : `ademe`
- Milestone : `1`

## ⚠️ Cas d'Échec

Le merge automatique échoue si :

- La PR est en mode draft
- Il y a des conflits de merge
- Les checks de statut échouent
- La PR n'est pas mergeable

Dans ces cas, un commentaire est ajouté à la PR pour indiquer l'échec.

## 🔍 Monitoring

Vous pouvez surveiller l'activité dans :

- L'onglet **Actions** de GitHub pour voir les workflows
- L'onglet **Pull requests** pour voir les PRs Dependabot
- Les **Notifications** pour être informé des merges automatiques

## 🛠️ Personnalisation

Pour modifier le comportement :

1. **Fréquence des mises à jour** : Modifiez `schedule` dans `dependabot.yml`
2. **Groupement** : Ajustez les `groups` dans `dependabot.yml`
3. **Conditions de merge** : Modifiez la logique dans `auto-merge-dependabot.yml`
4. **Checks requis** : Ajoutez/supprimez des jobs dans `ci.yml`

## 📝 Notes Importantes

- Le merge automatique ne fonctionne que pour les PRs créées par `dependabot[bot]`
- Les mises à jour majeures peuvent être ignorées selon la configuration
- Les dépendances de développement sont incluses par défaut
- Le cache pnpm est utilisé pour accélérer les builds
