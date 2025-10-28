#!/bin/bash

# Script de test pour vérifier la configuration Dependabot
# Usage: ./scripts/test-dependabot-config.sh

echo "🔍 Vérification de la configuration Dependabot..."

# Vérifier que les fichiers de configuration existent
echo "📁 Vérification des fichiers de configuration..."

if [ ! -f ".github/dependabot.yml" ]; then
    echo "❌ Fichier .github/dependabot.yml manquant"
    exit 1
else
    echo "✅ .github/dependabot.yml trouvé"
fi

if [ ! -f ".github/workflows/auto-merge-dependabot.yml" ]; then
    echo "❌ Fichier .github/workflows/auto-merge-dependabot.yml manquant"
    exit 1
else
    echo "✅ .github/workflows/auto-merge-dependabot.yml trouvé"
fi

if [ ! -f ".github/workflows/ci.yml" ]; then
    echo "❌ Fichier .github/workflows/ci.yml manquant"
    exit 1
else
    echo "✅ .github/workflows/ci.yml trouvé"
fi

# Vérifier la syntaxe YAML
echo "🔧 Vérification de la syntaxe YAML..."

if command -v yq &> /dev/null; then
    echo "Vérification avec yq..."
    yq eval '.version' .github/dependabot.yml > /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Syntaxe YAML de dependabot.yml valide"
    else
        echo "❌ Syntaxe YAML de dependabot.yml invalide"
        exit 1
    fi
else
    echo "⚠️  yq non installé, impossible de vérifier la syntaxe YAML"
fi

# Vérifier que les scripts npm existent
echo "📦 Vérification des scripts npm..."

if grep -q '"typecheck"' package.json; then
    echo "✅ Script typecheck trouvé dans package.json"
else
    echo "❌ Script typecheck manquant dans package.json"
    exit 1
fi

if grep -q '"lint"' package.json; then
    echo "✅ Script lint trouvé dans package.json"
else
    echo "❌ Script lint manquant dans package.json"
    exit 1
fi

# Tester les commandes
echo "🧪 Test des commandes..."

echo "Test de pnpm lint..."
if pnpm lint > /dev/null 2>&1; then
    echo "✅ pnpm lint fonctionne"
else
    echo "❌ pnpm lint échoue"
    exit 1
fi

echo "Test de pnpm typecheck..."
if pnpm typecheck > /dev/null 2>&1; then
    echo "✅ pnpm typecheck fonctionne"
else
    echo "❌ pnpm typecheck échoue"
    exit 1
fi

echo "Test de pnpm build..."
if pnpm build > /dev/null 2>&1; then
    echo "✅ pnpm build fonctionne"
else
    echo "❌ pnpm build échoue"
    exit 1
fi

echo ""
echo "🎉 Tous les tests sont passés !"
echo "📋 Prochaines étapes :"
echo "   1. Configurez les branches protégées dans GitHub"
echo "   2. Activez Dependabot dans les paramètres du repository"
echo "   3. Surveillez les premières PRs automatiques"
echo ""
echo "📖 Documentation complète : docs/dependabot-setup.md"
