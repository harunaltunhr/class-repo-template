function renderStudent(student) {

  const studentImg = document.createElement('img');
  studentImg.alt = student.name + ' - ' + student.userName;
  studentImg.style = 'height:100px;width:100px;';

  fetch('https://api.github.com/users/' + student.userName)
    .then(resp => resp.json())
    .then(user => user.avatar_url
      ? studentImg.src = user.avatar_url
      : null
    )
    .catch(err => console.log(err));

  const nameComponent = document.createElement('p');
  nameComponent.innerHTML = student.name + ' - ' + student.userName;


  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + student.userName;
  githubButton.style = 'height:35px;'

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + student.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);

  const portfolioButton = document.createElement('button');
  portfolioButton.innerHTML = student.userName + '.github.io';
  portfolioButton.style = 'height:35px;'

  const portfolioLink = document.createElement('a');
  portfolioLink.href = 'https://' + student.userName + '.github.io';
  portfolioLink.target = '_blank';
  portfolioLink.appendChild(portfolioButton);

  const container = document.createElement('div');
  container.appendChild(studentImg);
  container.appendChild(nameComponent);
  container.appendChild(githubLink);
  container.appendChild(portfolioLink);
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('br'));


  return container;

}
