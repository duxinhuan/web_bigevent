$(function () {
  var layer = layui.layer
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  $('#file').on('change', function (e) {
    var fileList = e.target.files
    console.log(fileList)

    if (fileList.length === 0) {
      return layer.msg('请选择照片!')
    }

    // 文件存在 拿到用户选择的文件
    var file = e.target.files[0]
    // 将文件转化为 路径
    var imageURL = URL.createObjectURL(file)
    // 重新初始化裁剪区域  销毁旧的裁剪区域   重新设置图片路径  重新初始化
    $image.cropper('destroy').attr('src', imageURL).cropper(options)
  })

  $('#btnUpload').on('click', function () {
    //获取图片
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        //创建一个canvas画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png')

    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('上传失败！')
        }
        layer.msg('上传成功！')
        window.parent.getUserInfo()
      },
    })
  })
})
