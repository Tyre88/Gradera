(function(angular) {
    angular.module('graderaklubb').service('form', form);
    angular.module('graderaklubb').service('form-service', formService);

    formService.$inject = ["$http"];

    function form() {
        this.Form = {
            Id: 0,
            CreatedByUserId: 0,
            ClubId: 0,
            CreatedDate: new Date(),
            StartDate: new Date,
            EndDate: new Date,
            IsExternal: false,
            IsDeleted: false,
            Name: "",
            FormFields: [],
            Initialize: function (formModel) {
                this.Id = formModel.Id;
                this.CreatedByUserId = formModel.Id;
                this.ClubId = formModel.ClubId;
                this.CreatedDate = formModel.CreatedDate;
                this.StartDate = formModel.StartDate;
                this.EndDate = formModel.EndDate;
                this.IsExternal = formModel.IsExternal;
                this.IsDeleted = formModel.IsDeleted;
                this.Name = formModel.Name;

                if (formModel.FormFields != undefined && formModel.FormFields.length > 0) {
                    this.FormFields = [];

                    for (var i = 0; i < formModel.FormFields.length; i++) {
                        var field = angular.copy(this.FormField);
                        field.className = formModel.FormFields[i].ClassName;
                        field.type = formModel.FormFields[i].Type;
                        field.key = formModel.FormFields[i].Id;
                        field.templateOptions.label = formModel.FormFields[i].Label;
                        field.templateOptions.required = formModel.FormFields[i].IsRequired;

                        if(formModel.FormFields[i].Options != undefined && formModel.FormFields[i].Options.length > 0)
                        {
                            field.templateOptions.options = [];

                            for(var o = 0; o < formModel.FormFields[i].Options.length; o++)
                            {
                                var option = angular.copy(this.FormFieldOption);
                                option.name = formModel.FormFields[i].Options[o].Name;
                                option.group = formModel.FormFields[i].Options[o].GroupName;
                                option.value = formModel.FormFields[i].Options[o].Id;
                                field.templateOptions.options.push(option);
                            }
                        }

                        this.FormFields.push(field);
                    }
                }
            },
            FormField: {
                className: "",
                type: "input",
                key: 0,
                templateOptions: {
                    label: "",
                    required: false,
                    options: []
                }
            },
            FormFieldOption: {
                name: "",
                group: "",
                value: 0
            }
        };
    }

    function formService($http) {
        this.GetUnansweredForms = function(count) {
            return $http.get('/api/forms/GetUnansweredForms?' + $.param({count: count}));
        };

        this.GetForm = function(formId) {
            return $http.get('/api/forms/GetForm?' + $.param({formId: formId}));
        };

        this.SubmitForm = function(formFields) {
            return $http.post('/api/forms/SubmitForm', formFields);
        }
    }
}(window.angular));