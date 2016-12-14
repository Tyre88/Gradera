(function (angular) {
    angular.module('graderaklubbexternal').service('form', form);
    angular.module('graderaklubbexternal').service('form-external-service', formService);

    formService.$inject = ["$http", "Upload"];

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
            Description: "",
            MultipleSubmits: false,
            EnableExcelImport: false,
            ExampleExcelPath: "",
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
                this.Description = formModel.Description;
                this.MultipleSubmits = formModel.MultipleSubmits;
                this.EnableExcelImport = formModel.EnableExcelImport;
                this.ExampleExcelPath = formModel.ExampleExcelPath;

                if (formModel.FormFields != undefined && formModel.FormFields.length > 0) {
                    this.FormFields = [];

                    for (var i = 0; i < formModel.FormFields.length; i++) {
                        var field = angular.copy(this.FormField);
                        field.className = formModel.FormFields[i].ClassName;
                        field.type = formModel.FormFields[i].Type;
                        field.key = formModel.FormFields[i].Id;
                        field.name = formModel.FormFields[i].Label;
                        field.templateOptions.label = formModel.FormFields[i].Label;
                        field.templateOptions.required = formModel.FormFields[i].IsRequired;
                        field.data.CanMultiply = formModel.FormFields[i].CanMultiply;

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
                },
                data: {}
            },
            FormFieldOption: {
                name: "",
                group: "",
                value: 0
            }
        };
    }

    function formService($http, Upload) {
        this.GetForm = function(clubShortName, formName) {
            return $http.get('/api/externalforms/getform?' + $.param({clubShortName: clubShortName, formName: formName}));
        };

        this.SubmitForm = function(formFields) {
            return $http.post('/api/externalforms/submitform', formFields);
        };
    }
}(window.angular));