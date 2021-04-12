$(function () {
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    $("#link_login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
        
    // 表单验证
    var form = layui.form
    // 验证登录提示
    var layer = layui.layer

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '请输入6-12位密码'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
          // 通过形参拿到的是确认密码框中的内容
          // 还需要拿到密码框中的内容
          // 然后进行一次等于的判断
          // 如果判断失败,则return一个提示消息即可
          var pwd = $('.reg-box [name=password]').val()
          if (pwd !== value) {
            return '两次密码不一致！'
          }
        }
    })

    // 注册事件
    
    $("#reg-form").on('submit', function (e) {
        e.preventDefault()
        $.post(
            '/api/reguser', {
                username:$(".reg-box [name=username]").val(),
                password:$(".reg-box [name=password]").val()
        }, function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！请登录')
                $("#reg-form")[0].reset()
                // 模拟点击按钮，成功后自动点击跳转到登录页面
                $("#link_login").click()
}
        )
    })

// 监听登陆表单的提交事件
    $("#login_form").submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("登录失败！")
                }
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem("token", res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }   
        })
    })
})