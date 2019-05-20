// 初始化
var col = 3;// 3列
var row = 50;// 50行
var title = $('#title');
var cont = $('#cont');
var op = $('#op');
var bg = ["bg-primary", "bg-success", "bg-info", "bg-warning", "bg-danger"];
var urls = ["www.baidu.com", "www.taobao.com", "www.toutiao.com", "www.jd.com", "www.tencent.com", "www.sina.com.cn", "www.sohu.com", "www.ifeng.com", "mini.eastday.com", "www.qq.com", "news.2345.com/shouye","www.weibo.com", "redirect.simba.taobao.com/rd", "ai.taobao.com", "imt.meituan.com", "www.people.com.cn", "kan.2345.com", "buy.2345.com"];
var citys = "北京市,天津市,上海市,重庆市,河北省,山西省,辽宁省,吉林省,黑龙江省,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,海南省,四川省,贵州省,云南省,陕西省,甘肃省,青海省,台湾省,内蒙古自治区,广西壮族自治区,西藏自治区,宁夏回族自治区,新疆维吾尔自治区,香港特别行政区,澳门特别行政区".split(",");
var flag = true;

function init(end, start) {
    start = start || 0;
    for (var start = start; start < end; start++) {
        title.append('<th><span>col_' + start + '</span></th>');
        cont.append('<td></td>');
        op.append('<td><textarea type="text" index="' + start + '" class="form-control" placeholder="双击标签删除"></textarea></td>');
    }
}
function delCol(start, end) {
    start = start || 0;
    for (var start = start; start < end; start++) {
        title.find('th:last-child').remove();
        cont.find('td:last-child').remove();
        op.find('td:last-child').remove();
    }
}

$('body').on('keyup', 'textarea', function (e) {
    e.preventDefault();
    var keycode = e.keyCode;//键盘码
    if (keycode == 13 || flag) {// 按enter键
        var text = $(this).val().trim();//当前输入框的值
        if (!!text) {//不为空
            var i = $(this).attr('index');//索引位置
            $(text.split(",")).each(function (j) {
                if (this != '') {
                    $('td').eq(i).append('<p class="tag ' + bg[r(bg.length)] + '">' + this.trim() + '</p>');
                }
            });
            $(this).val("");
        }
    }
});

$('body').on('dblclick', '.tag', function () {
    $(this).remove();
});

function r(end, start) {
    start = start || 0;
    return parseInt(Math.random() * (end - start)) + start;
}

$('.col').click(function () {
    $(this).addClass("bg-success").siblings(".bg-success").removeClass("bg-success");
    var newCol = parseInt($(".col.bg-success").text());
    if (newCol > col) {
        init(newCol, col);
    } else {
        delCol(newCol, col)
    }
    col = newCol;
});

$('#ip').click(function () {
    var temp = '';
    for (var i = 0; i < 5; i++) {
        temp += r(255, 100) + "." + r(255) + "." + r(255) + ",";
    }
    $('#temp').text(temp);
});
$('#city').click(function () {
    var temp = '';
    for (var i = 0; i < 5; i++) {
        temp += citys[r(citys.length)] + ",";
    }
    $('#temp').text(temp);
});

$('#url').click(function () {
    var temp = '';
    for (var i = 0; i < 5; i++) {
        temp += urls[r(urls.length)] + ",";
    }
    $('#temp').text(temp);
});

$('#clear').click(function () {
    $('#cont>td, #test_data').html("");
});

$('#create').click(function () {
    var data = [];
    var vStr = '';
    cont.find("td").each(function (i) {
        var temp = [];
        $(this).find("p").each(function (j) {
            temp.push($(this).text());
        });
        data.push(temp);
        vStr += temp.toString() + "|";
    });
    localStorage.setItem("data", vStr);
    var res = "";
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < data.length; j++) {
            var tags = data[j];
            var len = tags.length;
            res += tags[r(len)] + " ";
        }
        res += "\n";
    }
    $('#test_data').val(res);
});


$(function () {
    init(col);
    $('input').eq(0).attr('placeholder','回车生成标签');
    $('input').eq(2).attr('placeholder','多个标签以","逗号分隔');
    var vStr = localStorage.getItem("data");
    if (!!vStr) {
        $(vStr.split("|")).each(function (i) {
            $('textarea').eq(i).val(this);
        });
    }
    $('textarea').keyup();
    flag = false;
});
