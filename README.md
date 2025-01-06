This repository contains a custom Shopify theme that can be downloaded, modified, and deployed to your Shopify store. Follow the steps below to set up and start working with the theme.

Link: https://uxmxtx-9p.myshopify.com

Password: admin

---

## Prerequisites

Ensure you have the following tools installed on your machine:

1. [Node.js](https://nodejs.org/) (LTS version recommended)
2. [Shopify CLI](https://shopify.dev/docs/apps/tools/cli) (v3 or higher)
3. [Git](https://git-scm.com/)
   


## Installation Instructions

### 1. Clone the Repository
To clone the theme from GitHub, open your terminal and run the following command:

```
git clone [https://github.com/username/shopify-theme.git](https://github.com/NataliiaRosol/refactorapp.git)
```

2. Navigate to the Theme Folder
Change to the directory of the cloned repository:

```
cd shopify-theme
```

3. Install Dependencies
Install the necessary Node.js dependencies if a package.json file exists:

```
npm install
```

4. CSS Preprocessing (SCSS)

This theme uses **SCSS** for styling. SCSS files are located in the `assets/scss/` folder. These are compiled into a single CSS file using **Gulp**.

---

Make sure you have Gulp and gulp packages installed:

```bash
npm install --global gulp-cli
npm install gulp-sass
npm i gulp-concat -D
npm install sass --save-dev
```

Updating Styles with Gulp
To update the styles in the project, use the following command:
```
gulp styles
```

4. Login to Shopify

5. Open theme to preview changes without uploading:
```
shopify theme dev
```
