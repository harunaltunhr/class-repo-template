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

  const studentParam = urlParams.get("student");
  state.currentStudent = state.students
    .find(student => student.name === studentParam)
    || state.students
      .find(student => student.userName === studentParam);

  const moduleParam = urlParams.get("module");
  state.currentModule = state.modules
    .find(module => module.name === moduleParam)
    || state.modules
      .find(module => module.board === Number(moduleParam))
    || state.modules
      .find(module => module.repo === moduleParam);


  console.log(state);

  state.root = document.getElementById('root');
  const root = state.root;

  if (state.currentStudent && state.currentModule) {
    root.appendChild(await studentThumb(state.currentStudent));
    root.appendChild(document.createElement('hr'));
    root.appendChild(await moduleThumb(state.currentModule));
    root.appendChild(await assignments(state.currentModule, state.currentStudent));
  } else if (state.currentStudent) {
    renderStudent(state.currentStudent, state);
  } else if (state.currentModule) {
    renderModule(state.currentModule, state);
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
