document.addEventListener("DOMContentLoaded", function () {
    const add_btn = document.getElementById("add_btn");
    const input_box = document.getElementById("input1");
    const app_body = document.getElementById("app_body");
    const filter = document.getElementById('filter');

    filter.addEventListener('change', () => {
        const filterValue = filter.value;
        const tasks = app_body.querySelectorAll('.item');
      
        tasks.forEach(task => {
          const checkbox = task.querySelector('input[type="checkbox"]');
          const isCompleted = checkbox && checkbox.checked;
      
          if (filterValue === 'all') {
            task.style.display = 'block';
          } else if (filterValue === 'completed') {
            task.style.display = isCompleted ? 'block' : 'none';
          } else if (filterValue === 'uncompleted') {
            task.style.display = !isCompleted ? 'block' : 'none';
          }
        });
      });

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

        const editBtn = document.createElement('button');
        editBtn.className = 'edit_btn';
        editBtn.textContent = 'Edit';

        cancelButton.appendChild(cancelSpan);
        itemDiv.appendChild(cancelButton);
        itemDiv.appendChild(checkboxInput);
        itemDiv.appendChild(editBtn);
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

    app_body.addEventListener('click', function (event) {
        const target = event.target;
    
        if (target.classList.contains('cancel')) {
            const taskItem = target.closest('.item');
            if (taskItem) taskItem.remove();
            save();
    
        } else if (target.classList.contains('chk_box')) {
            save();
    
        } else if (target.classList.contains('edit_btn')) {
            const taskItem = target.closest('.item');
            const contentDiv = taskItem.querySelector('.content');
    
            if (target.textContent === 'Edit') {
                // Switch to editable input
                const input = document.createElement('textarea');
               // input.type = 'text';
                input.value = contentDiv.textContent;
                input.className = 'edit_input';
                input.style.display='block';
    
                taskItem.replaceChild(input, contentDiv);
                target.textContent = 'Save';
            } else {
                // Save changes
                const input = taskItem.querySelector('.edit_input');
                const newContent = document.createElement('div');
                newContent.className = 'content';
                newContent.textContent = input.value;
    
                taskItem.replaceChild(newContent, input);
                target.textContent = 'Edit';
                save();
            }
        }
    });
    

    show();
});


