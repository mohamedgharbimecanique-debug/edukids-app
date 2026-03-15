# Guide de Construction APK - EDUKIDS 2.0

## Aperçu
Ce guide explique comment construire un fichier APK Android pour l'application EDUKIDS 2.0 en utilisant Capacitor et Cordova.

## Prérequis

### Logiciels Requis
1. **Node.js** (v14 ou plus) - https://nodejs.org
2. **Java Development Kit (JDK)** - Version 11 ou plus
3. **Android SDK** - Téléchargez via Android Studio
4. **Android Studio** (optionnel mais recommandé)
5. **Git** - https://git-scm.com

### Variables d'Environnement
Configurer les variables d'environnement suivantes:
- `JAVA_HOME` → chemin vers votre installation JDK
- `ANDROID_SDK_ROOT` → chemin vers votre Android SDK
- `ANDROID_HOME` → même que ANDROID_SDK_ROOT

## Étapes de Construction

### 1. Cloner le Projet
```bash
git clone https://github.com/mohamedgharbimecanique-debug/edukids-app.git
cd edukids-app
```

### 2. Installer les Dépendances
```bash
npm install
```

### 3. Installer Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### 4. Initialiser le Projet Capacitor
Si c'est la première fois:
```bash
npx cap init
```

Répondre aux invites:
- App name: EDUKIDS 2.0
- App Package: com.mohamedgharbimecanique.edukids
- Web dir: . (point)

### 5. Ajouter la Plateforme Android
```bash
npx cap add android
```

### 6. Copier les Assets Web
```bash
npx cap copy android
```

### 7. Synchroniser le Projet
```bash
npx cap sync android
```

### 8. Ouvrir dans Android Studio
```bash
npx cap open android
```

### 9. Configurer l'APK pour la Production
Dans Android Studio:
- Menu: Build → Generate Signed Bundle / APK
- Sélectionner APK
- Créer une clé de signature (keystore) ou en utiliser une existante
- Remplir les informations:
  - Key store path: chemin vers votre fichier .jks
  - Password: votre mot de passe
  - Key alias: alias de la clé
  - Key password: mot de passe de la clé

### 10. Configurer les Options de Build
- Sélectionner "release"
- Cliquer Finish

### 11. Le fichier APK sera généré à:
```
android/app/release/app-release.apk
```

## Méthode Alternative: Utiliser Gradle en Ligne de Commande

```bash
# Naviguer au dossier android
cd edukids-app/android

# Build en release mode
./gradlew assembleRelease

# Output: android/app/release/app-release.apk
```

## Dépannage

### Erreur: "SDK Location Not Found"
- Créer un fichier `local.properties` dans le dossier `android/`
- Ajouter: `sdk.dir=/chemin/vers/Android/sdk`

### Erreur: "No Java Installation Found"
- Vérifier que JAVA_HOME est correctement configuré
- Tester: `java -version`

### Build Failure
- Nettoyer: `cd android && ./gradlew clean`
- Relancer: `./gradlew assembleRelease`

## Distribution

### Google Play Store
1. Créer un compte Google Play Developer ($25 une fois)
2. Créer une nouvelle application
3. Télécharger l'APK signé
4. Remplir les informations de l'application
5. Soumettre pour révision

### Distribution Directe
- Partager le fichier APK directement aux utilisateurs
- Installer avec: `adb install app-release.apk`

## Optimisation APK

### Réduire la Taille
```gradle
// Dans android/app/build.gradle
android {
    bundle {
        density {
            enableSplit = true  // Diviser par densité d'écran
        }
    }
}
```

### Proguard/R8 (Minification)
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

## Spécifications de l'App EDUKIDS

- **Min SDK**: 21 (Android 5.0)
- **Target SDK**: 34 (Android 14)
- **Version**: 2.0
- **Tailles d'Écran Supportées**: Small, Normal, Large, XLarge
- **Densités d'Écran**: ldpi, mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi

## Support
Pour plus d'informations:
- Documentation Capacitor: https://capacitorjs.com
- Documentation Android: https://developer.android.com
- GitHub: https://github.com/mohamedgharbimecanique-debug/edukids-app
