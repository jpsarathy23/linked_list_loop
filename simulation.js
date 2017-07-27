function drawCircle(selector, id, cx, cy, r, fill) {
    var svgns = "http://www.w3.org/2000/svg";
    var svgDocument = $(selector)[0];
    var shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", cx);
    shape.setAttributeNS(null, "cy", cy);
    shape.setAttributeNS(null, "r",  r);
    shape.setAttributeNS(null, "fill", fill);
    shape.setAttributeNS(null, "id", "node"+id);
    svgDocument.appendChild(shape);
};
function clearSvg(selector) {
    var svgDocument = $(selector);
    svgDocument.empty();
}
function fill(slow_pointer_node, fast_pointer_node) {
    if (slow_pointer_node == fast_pointer_node) {
        $("#node"+slow_pointer_node)[0].style.fill = "green";
        $("#node"+fast_pointer_node)[0].style.fill = "green";
        return;
    }
    $("#node"+slow_pointer_node)[0].style.fill = "red";
    $("#node"+fast_pointer_node)[0].style.fill = "brown";
}
function reset(slow_pointer_node, fast_pointer_node) {
    $("#node"+slow_pointer_node)[0].style.fill = "grey";
    $("#node"+fast_pointer_node)[0].style.fill = "grey";
}
$("#start").click(function() {
    clearSvg("#list");
    var loop_length = $('#loop_length').val();
    var list_length = $('#list_length').val();
    var radius = Math.min(loop_length * 10, 400);
    var circle_radius = (loop_length>25)?5:10;
    var node_cnt = 1;
    var x_offset = (list_length - loop_length + 1) * 5 * circle_radius + radius;
    var y_offset = radius + 50;
    for (i=0; i<list_length - loop_length; i++) {
        drawCircle("#list", node_cnt++, 50 + i * 5 * circle_radius, y_offset, circle_radius, "grey");
    }
    for (i=0; i<loop_length; i++) {
        drawCircle("#list", node_cnt++, x_offset + radius * Math.cos(i * 2 * Math.PI/loop_length - Math.PI), y_offset + radius * Math.sin(i * 2 * Math.PI/loop_length - Math.PI), circle_radius, "grey");
    }
    var slow_pointer_speed = Number($("#slow_pointer_speed").val());
    var fast_pointer_speed = Number($("#fast_pointer_speed").val());
    var simulation_speed = Number($("#simulation_speed").val());
    var slow_pointer_node = 1;
    var fast_pointer_node = 1;
    var move = function() {
        fill(slow_pointer_node, fast_pointer_node);
        if (slow_pointer_node == fast_pointer_node && slow_pointer_node != 1) {
            return;
        }
        setTimeout(
            function() {
                reset(slow_pointer_node, fast_pointer_node);
                slow_pointer_node += slow_pointer_speed;
                while (slow_pointer_node > list_length) {
                    slow_pointer_node = slow_pointer_node - loop_length;
                }
                fast_pointer_node += fast_pointer_speed;
                while (fast_pointer_node > list_length) {
                    fast_pointer_node = fast_pointer_node - loop_length;
                }
                move();
            }, simulation_speed*1000
        );
    };
    move();
});
