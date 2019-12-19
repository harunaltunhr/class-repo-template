// with Map cache
const studentThumb = async student => {

  if (studentThumb.cache.has(student)) {
    return studentThumb.cache.get(student);
  }

  const studentImg = document.createElement('img');
  studentImg.alt = student.name + ' - ' + student.userName;
  studentImg.style = 'height:130px;width:130px;';
  try {
    const userObjPromise = await fetch('https://api.github.com/users/' + student.userName);
    const userData = await userObjPromise.json();
    studentImg.src = userData.avatar_url;
  } catch (err) {
    console.log('--------', err);
  };


  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = student.name;


  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + student.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + student.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);


  const personalPageButton = document.createElement('button');
  personalPageButton.innerHTML = student.userName + '.github.io';

  const personalPageLink = document.createElement('a');
  personalPageLink.href = 'https://' + student.userName + '.github.io';
  personalPageLink.target = '_blank';
  personalPageLink.appendChild(personalPageButton);


  const allAssignments = document.createElement('button');
  allAssignments.innerHTML = 'Review all assignments';
  allAssignments.onclick = async () => {
    renderStudent(student, state);
  }

  const studentInfo = [nameComponent, githubLink, personalPageLink, allAssignments]
    .map(item => {
      const li = document.createElement('li');
      li.appendChild(item);
      return li;
    })
    .reduce((ul, li) => {
      ul.appendChild(li);
      return ul;
    }, document.createElement('ul'));


  const container = document.createElement('div');
  container.id = student.name;
  container.style = 'display:flex;flex-direction:row;padding-bottom:5%;padding-right:5%'

  container.appendChild(studentImg);
  container.appendChild(studentInfo);

  studentThumb.cache.set(student, container);
  return container;

}

studentThumb.cache = new Map();



// // with cache object
// const studentThumb = async student => {
//   student.count = typeof student.count === 'number'
//     ? student.count += 1
//     : student.count = 1;

//   if (studentThumb.cache[student.userName]) {
//     console.log('returning cached ' + student.userName)
//     return studentThumb.cache[student.userName];
//   }

//   const studentImg = document.createElement('img');
//   studentImg.alt = student.name + ' - ' + student.userName;
//   studentImg.style = 'height:10%;width:10%;';
//   studentImg.src = await fetch('https://api.github.com/users/' + student.userName)
//     .then(resp => resp.json())
//     .then(user => user.avatar_url)
//     .catch(err => {
//       console.log(err);
//       return "";
//     });

//   const container = document.createElement('div');
//   container.id = student.name;

//   container.appendChild(studentImg);

//   console.log('returning new ' + student.userName);

//   studentThumb.cache[student.userName] = container;
//   return container;

// }

// studentThumb.cache = {};
