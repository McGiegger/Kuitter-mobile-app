# Kuitter Design System

## Project Specifications
- **Platform**: Mobile application (iOS and Android)
- **Tech Stack**: React Native (with TypeScript)
- **Target Devices**: Smartphones and tablets
- **Design Approach**: Mobile-first, native feel with premium aesthetics
- **Backend Integration**: RESTful API with Firebase/Supabase

This document outlines the core design system for Kuitter, including color palette, typography, and visual elements. This serves as the foundation for all UI components.

## Design Philosophy

Kuitter aims to create a premium, supportive digital environment that feels both private and encouraging. The app should convey:

- **Trust & Security**: Users are sharing sensitive information and need to feel secure
- **Progress & Hope**: Visual elements should emphasize growth and positive change
- **Calm & Focus**: The interface should reduce anxiety and promote mindfulness
- **Premium Experience**: High-quality design elements that feel polished and valuable

## Color Palette

### Premium Theme (Default)
- **Primary**: Deep indigo (#3A3A8C) - Conveys trust, stability, and depth
- **Secondary**: Teal accent (#1D7D81) - Represents growth and renewal
- **Background**: Rich dark gradient from deep blue to near-black (#131836 to #0A0A1A)
- **Surface Elements**: Slightly lighter than background with subtle gradient (#1E2340)
- **Success**: Muted emerald green (#2A9D8F)
- **Warning/Urge**: Amber (#FF8800)
- **Error/Relapse**: Muted crimson (#CF3030)
- **Text**: White (#FFFFFF) and light gray (#E0E0E0)
- **Accent Highlights**: Subtle gold (#D4AF37) for achievements and milestones

### Light Theme (upon toggle)
- **Primary**: Softer indigo (#4B4BA8)
- **Secondary**: Lighter teal (#26A0A5)
- **Background**: Off-white (#F8F9FC)
- **Surface Elements**: White (#FFFFFF) with subtle shadows
- **Text**: Dark gray (#333333) and medium gray (#666666)
- **Other elements**: Lighter versions of the premium theme colors

## Typography
- **Primary Font**: SF Pro Display / Roboto (depending on platform)
- **Secondary Font**: SF Pro Text / Roboto
- **Headings**: Medium and Semi-Bold weights
- **Body Text**: Regular weight with generous line height for readability
- **Accent Text**: Medium Italic for quotes and affirmations

## Iconography
- **Style**: Outlined with rounded corners, consistent stroke width
- **Animation**: Subtle entrance animations and state changes
- **Badge Icons**: Slightly more detailed, with metallic/dimensional treatment for achievements

## Visual Elements
- **Cards**: Subtle gradient backgrounds with soft shadows
- **Buttons**: Pill-shaped with subtle hover/press states
- **Progress Indicators**: Circular for streak timer, linear for other progress metrics
- **Dividers**: Thin, subtle gradients rather than solid lines
- **Illustrations**: Custom, consistent style showing diverse individuals in recovery journey scenarios

## Animations & Micro-interactions

### Key Animation Moments
- **Streak Milestones**: Celebration animations at 1, 7, 30, 90, 180, 365 days
- **Badge Unlocks**: Reveal animations with sound (if enabled)
- **Daily Check-In**: Subtle feedback animations
- **Mood Selection**: Emoji reactions to selection
- **Button Presses**: Tactile feedback animations
- **Screen Transitions**: Purposeful, direction-based transitions

### Micro-interactions
- **Pull-to-refresh**: Custom animation aligned with app theme
- **Toggle Switches**: Smooth state transitions
- **Text Fields**: Dynamic label animations
- **List Items**: Subtle entrance animations
- **Notifications**: Non-intrusive entrance and exit
- **Loading States**: Branded, meaningful loading animations
