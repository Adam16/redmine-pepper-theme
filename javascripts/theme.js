$(document).ready(function () {
    var $meta = $(document.createElement('meta'));
    $meta.name = 'viewport';
    $meta.content = 'width=450';
    $('head').append($meta);

    var $select = $("#project_quick_jump_box").hide(),
        $selectProject = $(document.createElement("div"));
    $selectProject.addClass("projectSelector");
    $selectProject.append($select);
    $selectProject.insertAfter($("#header h1"));
    $selectProject.show();
    $select.show();
});

