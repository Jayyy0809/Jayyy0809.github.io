// Replace these clearly marked concepts with real projects before publishing a final portfolio.
window.portfolioProjects = [
  {id:'orbit',title:'Orbit',category:'Digital',year:'01',subtitle:'A quieter kind of digital experience.',description:'A placeholder concept exploring hierarchy, rhythm, and focused interaction. Replace this entry with your project brief, role, process, and outcome.',theme:'orbit'},
  {id:'form',title:'Form & feeling',category:'Identity',year:'02',subtitle:'An identity with room to move.',description:'A placeholder identity study. Add the real project context, visual direction, and the decisions behind the final result.',theme:'form'},
  {id:'field',title:'Field notes',category:'Experiments',year:'03',subtitle:'Small observations. New perspectives.',description:'A placeholder collection of visual experiments. Replace with sketches, prototypes, or explorations from your own practice.',theme:'field'},
  {id:'parallel',title:'Parallel',category:'Digital',year:'04',subtitle:'Making the complex feel simple.',description:'A placeholder interaction concept. Use this space to describe the challenge, your contribution, and what changed through your work.',theme:'parallel'}
];
const koreanProjects = [
  {category:'디지털',subtitle:'차분함을 담은 디지털 경험.',description:'정보의 위계와 리듬, 집중할 수 있는 인터랙션을 탐구하는 예시 콘셉트입니다. 실제 프로젝트의 배경, 역할, 과정과 결과로 교체해 주세요.'},
  {category:'아이덴티티',subtitle:'유연하게 확장되는 아이덴티티.',description:'아이덴티티 디자인의 예시 콘셉트입니다. 실제 프로젝트의 맥락, 시각적 방향과 주요 의사결정을 작성해 주세요.'},
  {category:'실험',subtitle:'작은 관찰에서 새로운 시선으로.',description:'시각적 실험을 모은 예시입니다. 직접 만든 스케치나 프로토타입, 탐구한 내용을 추가해 주세요.'},
  {category:'디지털',subtitle:'복잡한 것을 단순하게.',description:'인터랙션 디자인의 예시 콘셉트입니다. 해결하려던 문제와 기여한 부분, 작업을 통해 달라진 점을 작성해 주세요.'}
];
window.portfolioProjects.forEach((project, index) => { project.ko = koreanProjects[index]; });
