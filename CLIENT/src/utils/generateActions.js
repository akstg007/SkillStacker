import {
getActionProgress
} from "./progressManager";

export const generateActions = (
roadmap
) => {

if (!roadmap) {

```
return {
  today: [],
  week: [],
  month: []
};
```

}

const progress =
getActionProgress();

const phase =
roadmap.phases[
progress.currentPhase
];

if (!phase) {

```
return {
  today: ["🎉 Roadmap Completed"],
  week: [],
  month: []
};
```

}

const start =
(progress.currentDay - 1) * 3;

const today =
phase.focus.slice(
start,
start + 3
);

return {


today,

week:
  phase.focus.slice(
    0,
    7
  ),

month:
  phase.focus

}
}
