var userdetail, waitRequest = {};
var myCaptcha;
function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (window.location.hash.indexOf("#") < 0) return null;
  let r = window.location.hash.split("#")[1].match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
function setCookie(cname, cvalue, exdays) {
  console.log('设置cookie')
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString() + (1 || location.host == '127.0.0.1:5500' ? '  path=/;' : '  domain=.40code.com; path=/;');
  if (exdays < 0) {
    var expires = "expires=" + d.toGMTString() + ('  path=/;');
    document.cookie = cname + "=" + cvalue + "; " + expires;
    var expires = "expires=" + d.toGMTString() + (' domain=.40code.com; path=/;');
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {

  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      let d = c.substring(name.length, c.length);
      if (cname == 'token') {
      }
      return d
    }
  }
  return "";
}
function getuserinfo() {
  get({
    url: 'user/myinfo'
  }, function (d) {
    userdetail = d.data;
    console.log('获取信息成功', d)
  })
}
function getuserinfosync() {
  return new Promise(function (reslove) {
    get({
      url: 'user/myinfo'
    }, function (d) {
      userdetail = d.data;
      console.log('获取信息成功', d)
      reslove(userdetail)
    })
  })
}
function getworkinfosync(id) {
  return new Promise(function (reslove) {
    get({
      url: 'work/info',
      data: { id: id }
    }, function (d) {
      reslove(d.data)
    })
  })
}
function get(d, n, eee, method) {
  let d2 = d.data;
  if (typeof d === 'string') {
    d = { url: d }
  }
  if (!d2) d2 = {};
  if (d.p) {
    if (waitRequest[d.p]) return;
    waitRequest[d.p] = 1;
  }
  d2.token = getCookie('token');
  $.ajax({
    url: apihost + d.url,
    data: d2,
    type: method || 'get',
    // headers: { "Authorization": getCookie('token') },
    headers: { 'onreferer': location.pathname, 'href': location.href },
    success: function (f) {
      console.log(f)
      if (f.redirect) {
        location.href = f.redirect;
        return;
      }
      if (f.cz == 'exit') {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = 'token=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.40code.com; path=/;'; document.cookie = 'token=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        console.log('清除cookie')
      }
      d.p && (delete waitRequest[d.p])
      n && n(f)
    },
    error: function (e) {
      d.p && (delete waitRequest[d.p])
      console.log(e)
      if (eee)
        eee(e)
      else
        alert(e && e.responseJSON && (e.responseJSON.msg || e.responseJSON.errmsg) || "服务器或网络错误")
      if (e.status == 0 && e.statusText == 'error') {
        if (!window.qf) window.qf = 0;
        window.qf++;

        if (location.pathname == '/' && window.qf == 3)
          fetch('/111').then(d => {
            if (d.status) location.href = ("#page=qf")
          })

        return;
      }
      if (e.responseJSON.redirect) {
        location.href = e.responseJSON.redirect;
        return;
      }
    }
  })
}
setInterval(() => {
  if (!window.qf) window.qf = 0;
  else window.qf--;
}, 500)
function post(d, n, eee, method) {
  let d2 = d.data;
  if (d.p) {
    if (waitRequest[d.p]) return;
    waitRequest[d.p] = 1;
  }
  if (!d2) d2 = {};
  $.ajax({
    url: apihost + d.url + '?token=' + getCookie('token'),
    data: JSON.stringify(d2),
    type: method || 'post',
    contentType: 'application/json',
    headers: { 'onreferer': location.pathname, 'href': location.href },
    success: function (f) {
      console.log(f)
      d.p && (delete waitRequest[d.p])
      if (f.msg || f.errmsg) {
        alert(f.msg || f.errmsg)
      }
      if (f.cz == 'exit') {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log('清除cookie')
      }
      if (f.redirect) {
        location.href = f.redirect;
        return;
      }
      n && n(f)
    },
    error: function (e) {
      d.p && (delete waitRequest[d.p])
      console.log(e)
      if (eee) eee(e)
      else alert(e && e.responseJSON && (e.responseJSON.msg || e.responseJSON.errmsg) || "服务器或网络错误")
      if (e.status == 0 && e.statusText == 'error') {
        if (!window.qf) window.qf = 0;
        window.qf++;
        if (location.pathname == '/' && window.qf == 3)
          fetch('/111').then(d => {
            if (d.status) location.href = ("#page=qf")
          })
        return;
      }
      if (e.responseJSON.redirect) {
        location.href = e.responseJSON.redirect;
        return;
      }
    }
  })
}

if (getQueryString('i')) {
  setCookie('i', getQueryString('i'), 3);
}
function downloadFileByBlob(blob, fileName = "file") {
  let blobUrl = window.URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.download = fileName || 'defaultName'
  link.style.display = 'none'
  link.href = blobUrl
  // 触发点击
  document.body.appendChild(link)
  link.click()
  // 移除
  document.body.removeChild(link)
}
function dlp() {
  window.scratch.getProjectFile(file => {
    downloadFileByBlob(file);
  })
}
function savecover(callback) {
  $('#b').hide();
  function uplw(d) {
    let f = new FormData();
    $("#setCover").text('正在保存封面文件');
    f.append("image", d)
    $.ajax({
      url: apihost + 'work/uploads?token=' + getCookie('token'),
      method: 'POST',
      data: f,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',
      // 图片上传成功
      success: function (result1) {
        if (result1.code != 1) {
          hy();
          alert("保存失败");
          return;
        }
        hy(result1);
        $("#setCover").text('封面保存成功')
      },
      error: function () {
        hy();
        alert("保存失败");
      }
    });
  }
  function hy(r) {

    let k = r.data[2][0][1].Key.split('/');
    callback && callback(k[k.length - 1]);
    setTimeout(() => {
      $("#setCover").text('设置当前截图为封面');
      $("#save").text('保存');
    }, 5000)
  }
  $("#setCover").text('正在保存封面……');
  vm.postIOData('video', { forceTransparentPreview: true });
  vm.renderer.requestSnapshot(dataURI => {
    vm.postIOData('video', { forceTransparentPreview: false });
    uplw(dataURLToBlob(dataURI));
  });
  vm.renderer.draw();
}
async function saveproject(id, callback, Open) {
  console.log("自定义按钮1");
  console.log('分享按钮');
  let data2 = [];
  var vs = vm.assets;
  $("#scratch").css("opacity", "0");
  $('#view').show();
  $('#dlp').show();
  $('#i2').hide
  let f = function (i2) {
    let i = i2
    if (!i) return;
    for (let j = 0; j < vs.length; j++) {
      if (vs[j].assetId == i.split('.')[0]) {
        i = j; break;
      }
    }
    debugger
    i = new Blob([vs[i].data], { type: vs[i].assetType.contentType })
    console.log(URL.createObjectURL(i))
    return i
  }

  function hy() {
    $("#scratch").css("opacity", "1");
    $('#view').hide();
    $('#dlp').hide();
    // try {
    //   $("#save").text("保存")
    // } catch (e) {
    //   console.log(e)
    // }
    setTimeout(() => {
      $("#setCover").text('设置当前截图为封面');
      $("#save").text('保存');
    }, 5000)
    callback && callback();
  }
  function uplw() {
    let f = new FormData();
    $("#save").text('正在保存作品文件……');

    f.append("work", new Blob([vm.toJSON()]))
    $.ajax({
      url: apihost + 'work/upload?token=' + getCookie('token') + '&id=' + (id || workinfo.id),
      method: 'POST',
      data: f,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',
      headers: { 'onreferer': location.pathname, 'href': location.href, 'publish': Open || undefined },
      // 图片上传成功
      success: function (result1) {
        if (result1.code != 1) {
          hy();
          alert("保存失败");
          return;
        }
        hy();
        $(window).unbind('beforeunload');
        window.onbeforeunload = null;
        let vvv = "";
        try {
          vvv = $('.input_input-form_2EIqD.project-title-input_title-field_13MIs.menu-bar_title-field-growable_2DAmE').val()
        } catch (e) {

        }
        Open && (location.href = ("/#page=workinfo&publish=1&id=" + workinfo.id + '&name=' + vvv))
        $("#save").text('作品保存成功')
        window.onbeforeunload = function () { return; }
      },
      error: function () {
        hy();
        alert("保存失败");
      }
    });
  }

  function upa(t) {
    // debugger;
    if (!f(data2[t])) {
      if (t + 1/*n + t*/ >= data2.length) {
        $('#b').hide();
        uplw();
      }
      else
        upa(t + 1)
      console.log('被迫退出')
      return;
    }
    if (f(data2[t]).size > 5.5 * 1024 * 1024) {
      console.log('尺寸过大', t, data2[t], '跳过')
      mdui.snackbar('含有>5.5MB的素材，已跳过')
      t++;
      upa(t);
      return;
    }
    // debugger;
    let list = [], data = new FormData(), n = 0, file = f(data2[t]);
    data.append('image', file)
    console.log(n)
    debugger;
    $.ajax({
      url: apihost + 'work/uploads?token=' + getCookie('token'),
      method: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',
      // 图片上传成功
      success: function (result1) {
        if (result1.code != 1) {
          hy();
          alert("保存失败");
          return;
        }
        if (vm.assets && data2[t] && vm.assets[data2[t]]) vm.assets[data2[t]].clean = true;
        console.log(vm.assets, data2[t])
        $('#save').text('保存素材中…… ' + parseInt((t + 1/*n + t*/) / data2.length * 10000) / 100 + '%')
        if (t + 1/*n + t*/ >= data2.length) {
          $('#b').hide();
          uplw();
        }
        else
          upa(t + 1)
      },
      error: function () {
        hy();
        alert("保存失败");
        console.log('保存失败');
      }
    });
  }

  function chunk(arr, size) {
    var objArr = new Array();
    var index = 0;
    var objArrLen = arr.length / size;
    for (var i = 0; i < objArrLen; i++) {
      var arrTemp = new Array();
      for (var j = 0; j < size; j++) {
        arrTemp[j] = arr[index++];
        if (index == arr.length) {
          break;
        }
      }
      objArr[i] = arrTemp;
    }
    return objArr;
  }
  function sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), time)
    })
  }
  function aftercheck() {
    if (data2.length) {
      // $("#loadinfo").html('正在保存素材');
      $('#save').text("正在保存素材……")
      $('#b').show()
      upa(0);
    }
    else uplw();
  }

  $('#i2').hide();
  // $('#save').text("正在检查素材列表……")
  for (let i of vs) {
    if (!i.clean)
      data2.push(i.assetId + '.' + i.dataFormat)
  }
  let checkdata = await new Promise(async (resolve) => {
    console.log('fuckyou', data2)
    let list = chunk(data2, 1000), filelist = [], num = 0;
    // debugger;
    if (!list.length) resolve([])
    for (let i = 0; i < list.length; i++) {
      //   debugger;
      post({
        url: 'work/imagelist',
        data: { list: list[i] }
      }, (d) => {
        num++;
        console.log(d);
        filelist = filelist.concat(d.data);
        if (num == list.length) {
          resolve(filelist);
        }
      }, (d) => {
        resolve(null)
      })
      if (i != list.length - 1) await sleep(4000)
    }

  });
  if (checkdata) {
    data2 = checkdata
    console.log(data2)
    aftercheck();
  } else {
    alert('作品素材检查失败，请重试，多次失败请联系QQ:3274235903查看原因')
    hy();
  }


}
function save(open) {
  try {
    $("#save").text("保存中……")
  } catch (e) {
    console.log(e);
  }
  if (workinfo.isauthor)
    saveproject(null, null, open)
  else {
    try {
      $("#save").text("改编中……")
    } catch (e) {
      console.log(e);
    }
    post({
      url: 'work/new',
      p: 'newwork'
    }, function (d) {
      saveproject(
        d.info.insertId,
        function () {
          location.href = "/scratch#id=" + d.info.insertId;
          location.reload();
        }, open
      )
    })
  }

}
function dataURLToBlob(dataurl) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
var apihost = "https://service-dq726wx5-1302921490.sh.apigw.tencentcs.com/",
  mianhost = "http://127.0.0.1:5500",
  scratchhost = "https://abc.520gxx.com";
var id = getQueryString('id'),
  v = window.getQueryString('v')
var temp2 = { apihost }
window.markdownToHtml = e => {
  function modifyBilibiliTags(htmlString) {
    const imgRegex = /<img(?:[^>]*\salt="iframe"[^>]*)>/gi;

    const imgMatches = htmlString.match(imgRegex);

    if (imgMatches) {
      for (const imgTag of imgMatches) {
        const srcRegex = /src=["']([^"']+)["']/i;
        const srcMatch = imgTag.match(srcRegex);

        if (srcMatch) {
          let originalSrc = srcMatch[1];

          // 替换 &amp; 为普通的 &
          originalSrc = originalSrc.replace(/&amp;/g, '&');
          console.log(originalSrc)
          const bvidRegex = /\/BV([a-zA-Z0-9]+)\//i;
          const bvidMatch = originalSrc.match(bvidRegex);
          if (originalSrc.includes('player.bilibili.com')) {
            newTag = `<iframe src="${originalSrc}" allowfullscreen="allowfullscreen" style="
                      width: min( 100% ,700px );
                      height: 400px;
                  " scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>`;
            htmlString = htmlString.replace(imgTag, newTag);
          } else if (bvidMatch) {
            const bvid = bvidMatch[1];

            let newTag = '';
            if (originalSrc.includes('www.bilibili.com')) {
              const newSrc = `//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`;
              newTag = `<iframe src="${newSrc}" allowfullscreen="allowfullscreen" style="
                          width: min( 100% ,700px );
                          height: 400px;
                      " scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>`;
            }

            htmlString = htmlString.replace(imgTag, newTag);
          }
        }
      }
    }

    return htmlString;
  }


  let d = DOMPurify.sanitize(marked.parse(e))
  if (d.indexOf('iframe') == -1) return d;
  console.log('问问', d, modifyBilibiliTags(d))
  return modifyBilibiliTags(d)
};
window.userAgent = navigator.userAgent.toLowerCase()
window.isElectron = userAgent.indexOf(' electron/') > -1
if (window.isElectron) {
  var { shell } = eval('require("electron")')
  window.$ = window.jQuery = eval('require("../other/jquery.min.js")')
  window.mdui = eval('require("../other/mdui.min.js")')
  window.shell = shell
  window.prompt = async (t) => {
    try {
      return await mdui.prompt({
        headline: t,
        confirmText: "确定",
        cancelText: "取消"
      })
    } catch (e) { return null }
  };
}