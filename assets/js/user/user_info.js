$(function () {
  //等价于 const form = layui.form
  const { form } = layui
  const { layer } = layui
  // 校验规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称不能超过1-6位'
      }
    },
  })

  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(res)
        // 调用 form.val() 快速为表单赋值
        form.val('formUserInfo', res.data)
      },
    })
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('更新成功')
        // (iframe)调用父页面(index)中的方法,重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      },
    })
  })
})
