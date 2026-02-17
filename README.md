# Kinematic Arms

[![X (Twitter)](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/HarshithAshvi) [![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/harshith_ashvi)

An interactive kinematic arm visualization and simulation tool. Create chains of connected robotic arms, watch them trace mesmerizing patterns, and customize every aspect in real time.

Kinematic Arms is a lightweight web app built with Next.js + TypeScript. It uses HTML5 Canvas to animate forward kinematics chains, letting you experiment with arm lengths, rotation speeds, and colors to generate complex geometric patterns.

<img width="3600" height="2025" alt="kinematic-arms" src="https://github.com/user-attachments/assets/76c99814-68db-4526-91a3-515ebbede543" />


## Table of Contents

- [Kinematic Arms](#kinematic-arms)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Features](#features)
    - [General Controls](#general-controls)
    - [Per-Arm Controls](#per-arm-controls)
    - [Visualization](#visualization)
  - [Install](#install)
    - [Quick Start](#quick-start)
    - [Build for Production](#build-for-production)
    - [Requirements](#requirements)
  - [Usage](#usage)
    - [Creating Patterns](#creating-patterns)
    - [Tips](#tips)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Background

Forward kinematics is the process of determining the position of the end of a chain of connected segments given their joint angles. Kinematic Arms turns this concept into a visual playground: chain together any number of arms, give each a different rotation speed, and watch the tip trace intricate spirograph-like paths on a canvas.

## Features

### General Controls

- **Initial Angle** - Set the starting angle for the entire animation
- **Increment Angle** - Control the global rotation speed per frame
- **Background Color** - Pick any canvas background color
- **Path Color** - Choose the color of the traced trajectory
- **Path Stroke Width** - Adjust the thickness of the traced path

### Per-Arm Controls

Each arm in the chain can be independently configured:

- **Length** - Segment length in pixels
- **Initial Angle** - Starting rotation angle
- **Increment Angle** - Rotation speed per frame
- **Arm Color** - Individual color for each segment

Add as many arms as you want with the **Add Arm** button, or remove them with the trash icon.

### Visualization

- **Real-time animation** at 60fps using `requestAnimationFrame`
- **Path tracing** - the endpoint draws its trajectory (up to 10,000 points)
- **Dark / Light mode** - toggle via the navbar, with system preference detection
- **High-DPI support** - crisp rendering on Retina and high-DPI displays

## Install

### Quick Start

```bash
git clone https://github.com/harshith-ashvi/kinamatic-arms.git
cd kinamatic-arms

npm install
# or
pnpm install
# or
bun install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Requirements

- Node.js 18+
- A modern browser with HTML5 Canvas support

## Usage

### Creating Patterns

1. Open the app in your browser
2. Use the sidebar controls to set the global initial angle and increment angle
3. Click **Add Arm** to add kinematic segments to the chain
4. Adjust each arm's length, angle, and rotation speed
5. Pick colors for the background, path, and individual arms
6. Watch the endpoint trace geometric patterns on the canvas

### Tips

- Combine arms with different increment angles to create complex spirograph patterns
- Use small increment values for smooth, detailed curves
- Use larger increment values for more angular, star-like shapes
- Add more arms for increasingly intricate designs
- Adjust the path stroke width for bolder or finer traces

## Tech Stack

| Category   | Technology           |
| ---------- | -------------------- |
| Framework  | Next.js 16           |
| Language   | TypeScript           |
| UI Library | React 19             |
| Styling    | Tailwind CSS 4       |
| Components | shadcn/ui + Radix UI |
| Icons      | Lucide React         |
| Theming    | next-themes          |
| Rendering  | HTML5 Canvas 2D      |

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout with theme provider
│   ├── page.tsx                      # Main page with navbar and animation
│   └── globals.css                   # Global styles and dark mode config
├── components/
│   ├── kinematic-animation-layout.tsx  # State management and layout
│   ├── kinamatic-canvas.tsx            # Canvas rendering and animation loop
│   ├── kinamatic-control.tsx           # Sidebar control panel
│   ├── navbar.tsx                      # Header with title and theme toggle
│   ├── mode-toggle.tsx                 # Dark/light mode switcher
│   └── ui/                             # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       └── label.tsx
└── lib/
    ├── kinamatic-arm.ts              # KinematicArm class and drawing logic
    ├── types.ts                      # TypeScript interfaces
    └── utils.ts                      # Utility functions
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built by [Harshith](https://x.com/HarshithAshvi)
