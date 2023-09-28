# DB schema
```mermaid
  erDiagram
    User ||--o{ DoneActivity : has
    User ||--|{ ActivityStats : defines
    DoneActivity }o--o| ActivityStats : has
    PlannedActivity }o--|| User : has
    UserSettings }|--|| User : has
```
# Logic schema
```mermaid
  graph TD
      TodoList --> TodoModule
    TodoModule --> PlannedActivities
    TodoModule --> RecommendedActivities
      ActivitiesToAdd ---> PresetActivities
      HealthBars --> HealthBarsModule
      HealthBarsModule --> DoneActivities
      History ---> DoneActivities
      HealthBarsModule --> Metrics
      PlannedActivities --> User
      RecommendedActivities --> User
    PresetActivities --> User
      Metrics --> User
      DoneActivities --> User
    
    
