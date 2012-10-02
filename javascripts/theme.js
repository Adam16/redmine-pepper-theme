(function ($) {
    $.fn.down = function () {
        var el = this[0] && this[0].firstChild;
        while (el && el.nodeType != 1)
            el = el.nextSibling;
        return $(el);
    };
})(jQuery);

var injectViewportMetaTag = function() {
    var meta = $(document.createElement('meta'));
    meta.name = 'viewport';
    meta.content = 'width=450';
    $('head').append(meta);
};

var periodicalExecuter = function () {
    setInterval("periodicalExecuter", 1000);
};

ProjectMenuBuilder = {
    buildMenuItem: function (project) {
        try {
            var link = $(document.createElement('a'));
            link.href = project.url;
            link.htm = project.name;
            if (project.selected) {
                link.addClass('selected');
            }
            var li = $(document.createElement('li'));
            li.appendChild(link);
            return li;
        } catch (err) {
            console.error(err);
        }
    },

    buildList: function (projectSelector) {
        try {
            var projects = ProjectMenuBuilder.getProjects(projectSelector);
            var projectList = $(document.createElement('ul'));
            projectList.addClass('projects');
            projectList.css({ display: 'none' });

            projects.each(function (project, index) {
                projectList.appendChild(ProjectMenuBuilder.buildMenuItem(project));
            });

            return projectList;
        } catch (err) {
            console.error(err);
        }
    },

    buildProjectSelector: function (selectElement) {
        try {
            var selector = $(document.createElement('div'));
            selector.addClass('project_selector');

            var title = ProjectMenuBuilder.getTitle(selectElement);
            selector.appendChild(ProjectMenuBuilder.buildToggle(title));

            var projectList = ProjectMenuBuilder.buildList(selectElement);
            selector.appendChild(projectList);

            return selector;
        } catch (err) {
            console.error(err);
        }
    },

    buildToggle: function (title) {
        try {
            console.info("title");
            console.debug(title);
            if (title != null) {
                var _title = title.replace('...', '&hellip;'), toggle = $(document.createElement('a'));
                toggle.href = '#'; // Makes it behave like a real link
                toggle.addClass('toggle');
                toggle.title = title;
                toggle.innerHTML = _title;

                return toggle;
            } else {
                return title;
            }
        } catch (err) {
            console.error(err);
        }
    },

    getProjects: function (element) {
        try {
            var projectOptions = element.find('option[value!=""]');
            return projectOptions.map(function (node) {
                return {
                    url: node.value,
                    name: node.innerHTML,
                    selected: node.attr('selected') == 'selected'
                };
            });
        } catch (err) {
            console.error(err);
        }
    },

    getTitle: function (element) {
        try {
            var title = element.children(":first").html();
            return title;
        } catch (err) {
            console.error(err);
        }
    },

    // Hook up events
    bindEvents: function (selector) {
        try {
            selector.toggleProjects = function () {
                if ($(this).down('.projects').visible()) {
                    this.hideProjects();
                } else {
                    this.showProjects();
                }
            };

            selector.hideProjects = function () {
                $(this).down('.projects').hide();
                $(this).down('.toggle').removeClass('active');
            };

            selector.showProjects = function () {
                $(this).down('.projects').show();
                $(this).down('.toggle').addClass('active');
            };

            // Display the project dropdown when the toggle is clicked
            selector.down('.toggle').on('click', function (event) {
                selector.toggleProjects();
                event.stop();
            });

            // Hide the dropdown again a short while after we've moved the mouse away
            selector.on('mouseout', function (event) {
                selector.toggleTimer.hide();
            });

            // Cancel the timer to hide the dropdown if we move the mouse back over the menu
            selector.on('mouseover', function (event) {
                if (selector.toggleTimer) {
                    selector.toggleTimer.stop();
                }
            });
        } catch (err) {
            console.error(err);
        }
    },

    // Creates a menu with links to all the users projects and adds it next to the project name
    moveProjectSelectorToProjectName: function (projectSelector, projectName) {
        try {
            if (!projectSelector || !projectName) {
                return false;
            }

            var selector = ProjectMenuBuilder.buildProjectSelector(projectSelector);
            ProjectMenuBuilder.bindEvents(selector);

            // Insert the project selector after the project name
            projectName.insertAfter(selector);

            // Remove the original select list
            projectSelector.hide();
        } catch (err) {
            console.error(err);
        }
    }
};

$(document).ready(function () {
    ProjectMenuBuilder.moveProjectSelectorToProjectName(
        $('#quick-search select').first(),
        $('#header h1').first()
    );
    injectViewportMetaTag();
});

