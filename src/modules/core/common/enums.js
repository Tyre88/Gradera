/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.factory('gradeEnum', function() {
            var grade = {
                Kyu6: 16,
                Kyu5: 1,
                Kyu4: 2,
                Kyu3: 3,
                Kyu2: 4,
                Kyu1: 5,
                Dan1: 6,
                Dan2: 7,
                Dan3: 8,
                Dan4: 9,
                Dan5: 10,
                Dan6: 11,
                Dan7: 12,
                Dan8: 13,
                Dan9: 14,
                Dan10: 15
            };

            var grades = [
                {
                    Name: "6 Kyu",
                    Id: 16
                },
                {
                    Name: "5 Kyu",
                    Id: 1
                },
                {
                    Name: "4 Kyu",
                    Id: 2
                },
                {
                    Name: "3 Kyu",
                    Id: 3
                },
                {
                    Name: "2 Kyu",
                    Id: 4
                },
                {
                    Name: "1 Kyu",
                    Id: 5
                },
                {
                    Name: "1 Dan",
                    Id: 6
                },
                {
                    Name: "2 Dan",
                    Id: 7
                },
                {
                    Name: "3 Dan",
                    Id: 8
                },
                {
                    Name: "4 Dan",
                    Id: 9
                },
                {
                    Name: "5 Dan",
                    Id: 10
                },
                {
                    Name: "6 Dan",
                    Id: 11
                },
                {
                    Name: "7 Dan",
                    Id: 12
                },
                {
                    Name: "8 Dan",
                    Id: 13
                },
                {
                    Name: "9 Dan",
                    Id: 14
                },
                {
                    Name: "10 Dan",
                    Id: 15
                }
            ];

            return {
                grade: grade,
                grades: grades
            };
        });
    });