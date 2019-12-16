const init = async () => {

  window.state = await fetch('./app/data/index.json')
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    });
  if (window.state instanceof Error) return;

  state.students = await fetch('./app/data/students.json')
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    });
  if (window.state.students instanceof Error) return;

  state.modules = await fetch('./app/data/modules.json')
    .then(resp => resp.json())
    .catch(err => {
      console.log(err);
      return err;
    });
  if (window.state.modules instanceof Error) return;


  const urlParams = new URL(window.location.href).searchParams;

  state.currentStudent = state.students
    .find(student => student.name === urlParams.get("student"));

  state.currentModule = state.modules
    .find(module => module.name === urlParams.get("module"));


  console.log(state);

  const root = document.getElementById('root');
  if (state.currentStudent && state.currentModule) {
    root.appendChild(await studentThumb(state.currentStudent));
    root.appendChild(document.createElement('hr'));
    root.appendChild(await moduleThumb(state.currentModule));
    root.appendChild(await assignments(state.currentModule, state.currentStudent));
  } else if (state.currentStudent) {
    root.appendChild(await studentThumb(state.currentStudent));
    for (const module of state.modules) {
      root.appendChild(document.createElement('hr'));
      root.appendChild(await moduleThumb(module));
      root.appendChild(await assignments(module, state.currentStudent));
    }
  } else if (state.currentModule) {
    root.appendChild(await moduleThumb(state.currentModule));
    for (const student of state.students) {
      root.appendChild(document.createElement('hr'));
      root.appendChild(await studentThumb(student));
      root.appendChild(await assignments(state.currentModule, student));
    }
  } else {
    root.appendChild(await home(state));
  }


  document.getElementById('class-name').innerHTML = state.repoName;

  const repoButton = document.createElement('button');
  repoButton.innerHTML = 'to main repository';

  const a = document.createElement('a');
  a.href = "https://github.com/" + state.userName + "/" + state.repoName;
  a.target = "_blank";
  a.appendChild(repoButton);

  document.getElementById('to-main-repo').appendChild(a);

  document.getElementById('go-home-top').onclick = async () => {
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(await home(state));
  }

  document.getElementById('go-home-bottom').onclick = async () => {
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(await home(state));
  }
};
