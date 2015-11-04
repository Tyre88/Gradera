/**
 * Created by Victor on 2015-11-04.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.service('form', form);

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
                        for (var i = 0; i < formModel.FormFields.length; i++) {
                            var field = angular.copy(this.FormField);
                            field.Initialize(formModel.FormFields[i]);
                            this.FormFields.push(field);
                        }
                    }
                },
                FormField: {
                    Id: 0,
                    FormId: 0,
                    className: "",
                    type: "input",
                    key: 0,
                    templateOptions: {
                        label: "",
                        required: false,
                        options: []
                    },
                    Initialize: function (formField) {
                        this.Id = formField.Id;
                        this.FormId = formField.FormId;
                        this.className = formField.ClassName;
                        this.type = formField.Type;
                        this.templateOptions.label = formField.Label;
                        this.templateOptions.required = formField.IsRequired;
                        this.key = formField.Id;

                        if (formField.Options != undefined && formField.Options.length > 0) {
                            for (var i = 0; i < formField.Options.length; i++) {
                                var option = angular.copy(this.FormFieldOption);
                                option.Initialize(formField.Options[i]);
                                this.templateOptions.options.push(option);
                            }
                        }
                    }
                },
                FormFieldOption: {
                    Id: 0,
                    FormFieldId: 0,
                    name: "",
                    group: "",
                    value: 0,
                    Initialize: function(formFieldOption) {
                        this.Id = formFieldOption.Id;
                        this.FormFieldId = formFieldOption.FormFieldId;
                        this.name = formFieldOption.Name;
                        this.group = formFieldOption.GroupName;
                        this.value = formFieldOption.Id;
                    }
                }
            };
        }
    });