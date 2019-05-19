const maxTimestamp = 5000;
const visibleTimestamp = 15000;
const konamiCode = 'injects3crets';

let input = [];
let lastKeyPressed = 0;

const GetData = async () => {
    let data = await fetch('https://api.github.com/repos/elixir-lang/elixir/issues')
        .then(response => response.json());

    data = data.sort(x => x.created_at).slice(0, 5).map(x => {
        return {author: x.user.login, name: x.title}
    });
    return data;
};

const KeyPressed = async (evt) => {
    if (evt.keyCode === 27) {
        input = [];
    } else if (evt.keyCode === 16 || evt.keyCode === 17 || evt.keyCode === 18 || evt.keyCode === 20 || evt.keyCode === 19) {
        //skip shift,ctrl,alt etc.
    } else {
        CheckTimestamp();
        input.push(evt.key);
        await CheckCode();
    }
};

const CorrectCode = async () => {
    let data = await GetData();

    let body = document.getElementById('body');
    let secretDiv = document.createElement('div');
    secretDiv.id = 'secret-div';

    data.forEach(issue => {
        secretDiv.appendChild(CreateIssueDiv(issue));
    });

    body.appendChild(secretDiv);
    secretDiv.scrollIntoView();

    setTimeout(DestroySecretDiv, visibleTimestamp)
};

const CreateIssueDiv = (issue) => {
    let box = document.createElement('div');
    box.classList.add('issue-box');
    box.innerHTML = `<h2> ${issue.author}</h2> <p>${issue.name}</p>`;
    return box;
};

const DestroySecretDiv = () => {
    let element = document.getElementById('secret-div');
    element.parentNode.removeChild(element);
};

const CheckCode = async () => {
    if (input.join('') !== konamiCode) {
        return;
    }
    await CorrectCode();
};

document.onkeydown = async (evt) => {
    await KeyPressed(evt);
};

const CheckTimestamp = () => {
    let now = Date.now();
    if (now - lastKeyPressed > maxTimestamp) {
        input = [];
    }
    lastKeyPressed = now;
};
