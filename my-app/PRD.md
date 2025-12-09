────────────────────────────────────────────
## BUILD MEALFLASH MVP STRUCTURE (THIS IS THE IMPORTANT PART)
────────────────────────────────────────────

### 1. Create a complete file + folder structure:

/src  
  /components  
    CameraButton.tsx  
    MealCard.tsx  
    FoodItemEditor.tsx  
    ProgressRing.tsx  
    PredictionBadge.tsx  
    ConsistencyIndicator.tsx  
    ShareCardPreview.tsx  
  /screens  
    TodayScreen.tsx  
    CameraScreen.tsx  
    EditMealScreen.tsx  
    WeeklyCheckInOverlay.tsx  
    PaywallScreen.tsx  
    SettingsScreen.tsx  
  /state  
    meals.ts  
    user.ts  
    goals.ts  
    health.ts  
  /hooks  
    useMeals.ts  
    useAdaptiveGoals.ts  
    useWeeklyCheckIn.ts  
    useHealthSync.ts  
  /services  
    ai.ts (mock AI image analysis)  
    api.ts (mock backend)  
    predictions.ts  
  /navigation  
    AppNavigator.tsx  

### 2. Implement Navigation
Use React Navigation.  
Tabs or stacked structure is fine, but TodayScreen must be primary.

App loads → TodayScreen → CameraScreen → EditMealScreen.

### 3. Implement Placeholder Version of Every MVP Feature

#### A) AI Photo Logging (mocked)
- CameraScreen with Expo Camera  
- On capture → call mock AI function in services/ai.ts  
- AI returns array of food items (mock)  
- EditMealScreen shows editable cards  
- User taps “Save meal” → added to meals store

Include timestamps and logging durations for future performance instrumentation.

#### B) Search + Recent/Frequent fallback (mocked)
- Add a Search button on CameraScreen  
- Modal for global search (mock list)  
- “Recent/Frequent” list stored in meals.ts

#### C) TodayScreen
Must show:
- Today’s calories  
- Progress ring component  
- Predictive goal metric (“On track to hit X kg by Y date”)  
- Consistency indicator (“Logged X of last 7 days”)  
- Giant “Open Camera” CTA

#### D) Adaptive Calorie Goals engine
In /state/goals.ts add:
- currentGoalCalories  
- lastAdjustment  
- predictedGoalDate  
- logic to update goal after 14 days (mock scheduler)  

Messaging placeholders:
- supportive messages (never punitive)

#### E) Apple Health integration (mock for now)
Implement useHealthSync.ts with:
- mock “latest weight”  
- update predictions accordingly  
(Comment where HealthKit code will go)

#### F) Copy Yesterday (core retention)
In TodayScreen:
- If user has 1+ logged days → show “Copy yesterday” button  
- Implement meals.copyYesterday() in meals.ts  
- After copying → navigate to confirmation modal

#### G) Weekly Check-In (retention)
Implement WeeklyCheckInOverlay:
- Appears automatically every 7 days  
- Shows:  
  - Days logged this week  
  - Avg intake  
  - Predicted goal change  
  - One supportive CTA  
(Move to modal overlay)

#### H) Shareable Progress Card
Implement ShareCardPreview.tsx:  
- Simple card with weight, goal, predicted date, last 30 days logged  
- Export as image later (for now just view)

#### I) Trial + Paywall
Implement PaywallScreen.tsx:
- 14-day trial tracking  
- Hard gate when trial expired  
- Placeholder “Subscribe” button  

### 4. Implement Global State (Zustand recommended)
Use Zustand for:
- user state  
- meals state  
- goals state  
- health data  
- weekly check-in timestamps  

Must be persistent using AsyncStorage.

### 5. Mock AI Services
In services/ai.ts:
- return mocked items like:  
  [{ name: "Grilled Chicken", calories: 240 }, …]  
- Include simulated latency (2–3 seconds)

### 6. Instrumentation
Add logging timestamps to measure:  
- app open → camera ready  
- camera → AI result  
- AI result → meal saved

### 7. EVERY FILE MUST BE CREATED WITH ACTUAL CODE
Even placeholders must be valid working TypeScript.

### 8. After creating all files:
Explain where real AI, HealthKit, StoreKit, and backend logic will plug in.

Begin now by generating the full folder structure and creating the initial files.

You are helping me build a calorie-tracking app using Expo (React Native + Web).  
Read the following PRD enhancements and then implement the necessary screens, components, and logic in my Expo project.
### Core Requirements to Implement Now

1. Create the basic app structure:
   - Navigation setup (Tab or Stack as appropriate)
   - Screens: TodayScreen, CameraScreen, EditMealScreen, ProgressCardScreen, WeeklyCheckInOverlay, SettingsScreen.

2. Implement placeholder versions of:
   - AI Photo Logging flow
   - Edit-in-3-taps UX
   - Copy Yesterday flow
   - Consistency indicator on homescreen
   - Adaptive calorie goal messaging container
   - Weekly check-in overlay
   - Shareable progress card generator

3. Use simple mock data and mock AI responses for now, but structure the code so I can plug in a real API later.

### PRD Enhancements

### App Structure Guidelines

- Use TypeScript for all files.
- Follow Expo + React Native best practices.
- Keep components small, modular, and testable.
- Maintain a centralized state (Context or Zustand).
- Implement initial navigation skeleton first, then screens, then flow wiring.

### Deliverables

1. Create or update all relevant files in my project.
2. Implement working navigation between all major screens.
3. For each feature (AI logging, Copy Yesterday, streaks, adaptive goals, weekly check-in, share card), create:
   - A stub component
   - Placeholder UI
   - State structure
   - Mock logic
4. Add comments showing where future real logic (API, AI, Apple Health) will go.
