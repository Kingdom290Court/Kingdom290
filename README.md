# 🏰 Court Page - Kingdom #K290 (Total Battle)

> **"Justice is the foundation of power."** — BR Hakon

A governance and compensation calculation tool developed for **Kingdom #290** of the game _Total Battle_. This project assists judges, clan leaders, and players in calculating fair fines based on the current ROE (Rules of Engagement).

## 📜 About the Project

In _Total Battle_, illegal attacks (violating kingdom rules) require financial compensation in Silver. Calculating the exact cost of dead troops, considering production costs, resurrection costs, and penalty multipliers, is a complex and error-prone task.

**Court Page K290** automates this process, generating standardized reports ("Invoice" style) designed to be pasted directly into the game chat.

### ✨ Key Features

- **🛡️ Complete Catalog:** Up-to-date database containing all troops (Guardsmen, Specialists, Engineers, Monsters, Mercenaries) and their respective Tiers (T1 to T7+).
    
- **🧮 Automatic 25/75 Rule:** The system automatically calculates the mixed cost of troop loss:
    
    - **25%** of Production cost (Permanently lost troops).
        
    - **75%** of Resurrection cost (Troops that can be revived).
        
- **⚖️ Penalty Aggravators:**
    
    - **Top 100:** Automatic multiplier (x2) for high-power players.
        
    - **Tribunal:** Automatic multiplier (x2) for litigation cases.
        
- **📄 Official Report:** Generates formatted text, avoiding excessive emojis, focused on professional clarity for official logs.
    
- **🌙 Immersive UI:** "Dark Medieval" design focused on user experience.
    

## 🚀 Technologies Used

This project was built using the modern Vue ecosystem:

- [**Vue 3**](https://vuejs.org/ "null")**:** Progressive Framework (Composition API).
    
- [**Vite**](https://vitejs.dev/ "null")**:** Next Generation Frontend Tooling (Lightning fast).
    
- [**Tailwind CSS v4**](https://tailwindcss.com/ "null")**:** Utility-first CSS framework (Native CSS configuration).
    
- [**FontAwesome**](https://fontawesome.com/ "null")**:** Vector icons.
    

## 🛠️ How to Run

### Prerequisites

- Node.js (v18 or higher)
    
- NPM or Yarn
    

### Installation

1. Clone the repository:
    
    ```
    git clone [https://github.com/Kingdom290Court/Kingdom290.git](https://github.com/Kingdom290Court/Kingdom290.git)
    cd Kingdom290
    ```
    
2. Install dependencies:
    
    ```
    npm install
    ```
    
3. Run the development server:
    
    ```
    npm run dev
    ```
    
4. Access in your browser (usually `http://localhost:5173/`).
    

## 📦 How to Update Prices (Data)

The game economy changes. To update troop costs without touching the interface code, edit the data JSON file:

📂 `src/data/units.json`

The format is simple and readable:

```
{
  "tier": "T1",
  "units": [
    { 
      "unit": "T1 Archers", 
      "cost": 300,        // Production Cost
      "rez_cost": 40      // Resurrection Cost
    }
  ]
}
```

## 🌐 Deploy (GitHub Pages)

The project is configured for automatic deployment to GitHub Pages using the `gh-pages` package.

To deploy a new version:

1. Ensure that `base` in `vite.config.js` matches your repository name.
    
2. Run the command:
    
    ```
    npm run deploy
    ```
    
3. The site will be available at `https://kingdom290court.github.io/Kingdom290/`.
    

## 🤝 Contribution

Contributions are welcome! If you are from Kingdom #290 and want to improve the tool:

1. Fork the project.
    
2. Create a Branch for your Feature (`git checkout -b feature/NewFeature`).
    
3. Commit your changes (`git commit -m 'Adding new feature'`).
    
4. Push to the Branch (`git push origin feature/NewFeature`).
    
5. Open a Pull Request.
    

<p align="center"> Developed for the glory of Kingdom #K290 🦁 </p>
