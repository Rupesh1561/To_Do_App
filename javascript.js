document.addEventListener("DOMContentLoaded", function () {
    const add_btn = document.getElementById("add_btn");
    const input_box = document.getElementById("input1");
    const app_body = document.getElementById("app_body");

    function save() {
        const tasks = [];
        document.querySelectorAll('.item').forEach(item => {
            const task = {
                text: item.querySelector('.content').textContent,
                checked: item.querySelector('.chk_box').checked
            };
            tasks.push(task);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function show() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            createDynamicTemplate(task.text, task.checked);
        });
    }

    function createDynamicTemplate(text, checked) {
        var itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        var cancelButton = document.createElement('button');
        cancelButton.className = 'cancel_btn';

        var cancelSpan = document.createElement('span');
        cancelSpan.className = 'material-symbols-outlined cancel';
        cancelSpan.textContent = 'cancel';

        var checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.className = 'chk_box';
        checkboxInput.checked = checked;

        var contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.textContent = text;

        cancelButton.appendChild(cancelSpan);
        itemDiv.appendChild(cancelButton);
        itemDiv.appendChild(checkboxInput);
        itemDiv.appendChild(contentDiv);
        app_body.appendChild(itemDiv);
        input_box.value='';

        save();
    }

    add_btn.addEventListener('click', function () {
        if (input_box.value) {
            createDynamicTemplate(input_box.value, false);
        } else {
            alert("Give some value");
        }
    });

    app_body.addEventListener("click", function (event) {
        if (event.target.className === 'material-symbols-outlined cancel') {
            var parentnode = event.target.parentNode.parentNode;
            parentnode.remove();
            save();
        } else if (event.target.className === 'chk_box') {
            save();
        }
    });

    show();
});


