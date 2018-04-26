var LectureDetail = {
    SearchSchedule: function (seq) {
        $.ajax({
            type: "POST",
            url: "/ServiceCenter/Lecture/SearchSchedule",
            data: { seq: seq },
            success: function (data) {
                $('#divSch').html(data);
                var place = $('.map-address').text();
                GetGeoCode(place);
            }
        });
    }
};

$(document).ready(function () {
    console.log(SchSEQ);
    LectureDetail.SearchSchedule(SchSEQ);
});