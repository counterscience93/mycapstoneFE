<template>
  <div>
    <div class="login-overlay login-page"></div>
    <div class="login-box">
      <div class="login-logo">
        <div class="my-logo">
          <img src="../../assets/img-logo-fe.jpg" />
        </div>
      </div>
      <div class="login-box-body">
        <p class="login-box-msg">Vui lòng đăng nhập để bắt đầu</p>
        <div class="form-group has-feedback">
          <input
            class="form-control"
            name="Username"
            placeholder="Tên đăng nhập"
          />
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            name="Password"
            placeholder="Mật khẩu"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <p class="text-error"></p>
        <div class="validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li style="display:none"></li>
          </ul>
        </div>
        <p></p>
        <div class="form-group has-feedback">
          <button type="submit" class="btn btn-primary btn-block">
            Đăng nhập
          </button>
        </div>
        <div class="social-auth-links text-center">
          <div id="socialLoginList">
            <p>
              <b-btn
                class="btn btn-block btn-social btn-google"
                @click="login()"
                value="Google"
              >
                <i class="fab fa-google-plus"></i> Đăng nhập bằng email
                fpt.edu.vn
              </b-btn>
            </p>
          </div>
        </div>
        <!-- /.social-auth-links -->
      </div>
      <!-- /.login-box-body -->
    </div>
  </div>
</template>

<script>
import store from '../../store';
import UrlConstant from '../../common/constant/common-url';
import { decodeToken } from '../../common/utils/auth';
import { UserService } from '../../services/service-provider';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';
export default {
  data() {
    return {};
  },
  mounted() {
    this.checkUserLogin();
  },
  methods: {
    checkUserLogin() {
      const accestoken = CommonUtil.getCookies('access_token');
      // Redirect if user was login before
      if (accestoken) {
        this.handleRedirect(accestoken);
      }
    },
    login() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          const profile = GoogleUser.getBasicProfile();
          const info = {
            uid: profile.Eea,
            email: profile.U3,
            fullName: profile.ig,
            icon: profile.Paa
          };
          UserService.login(
            info,
            res => {
              CommonUtil.setCookie(
                'access_token',
                res,
                CommonConstant.DEFAULT_EXPIRED_TIME_COOKIE
              );
              store.dispatch('user/setToken', res);
              store.dispatch('user/login', info);
              localStorage.setItem('userInfo', JSON.stringify(info));
              this.handleRedirect(res);
            },
            () => {
              CommonUtil.showNotification(
                'Error',
                'Error occur when login! Please try again!',
                CommonConstant.NOTI_TYPE.ERROR
              );
            }
          );
        })
        .catch(error => {
          // on fail do something
          console.log(error);
        });
    },
    // Handle redirect when login success
    handleRedirect(token) {
      let role = decodeToken(token).role;
      role = parseInt(role);
      if (role === 5) {
        this.$router.push({
          path: UrlConstant.page.departmentHead.DH_APPROVED_TOPIC
        });
      } else if (role === 4) {
        this.$router.push({
          path: UrlConstant.page.departmentHead.DH_APPROVED_TOPIC
        });
      } else if (role === 3) {
        this.$router.push({
          path: UrlConstant.page.committe.CM_GETLIST_TOPIC
        });
      } else if (role === 2) {
        this.$router.push({
          path: UrlConstant.page.advisor.TOPIC_MNG
        });
      } else if (role === 1) {
        this.$router.push({
          path: UrlConstant.page.trainningStaff.TS_PUBLISHED_TOPIC
        });
      } else if (role === 0) {
        this.$router.push({
          path: UrlConstant.page.student.ST_GET_PUBLICTOPIC
        });
      }
    }
  }
};
</script>

<style scoped>
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  backdrop-filter: blur(5px);
  z-index: -1;
}
.login-page {
  background-image: url(../../assets/login-background.jpg);
  background-position: 0% 30%;
  /* background-position: bottom; */
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.login-box {
  border: 1px #f5b441 solid;
  border-radius: 5px;
  background: #d3d3d3c0;
  padding: 10px;
}
.login-box,
.register-box {
  width: 360px;
  margin: 7% auto;
}
.login-logo {
  margin-bottom: 0px;
  border-top: 5px;
}
.login-logo,
.register-logo {
  font-size: 35px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 300;
}
.login-box-body {
  border-bottom: 5px;
  background: initial;
}
.login-box-body,
.register-box-body {
  padding: 20px;
  border-top: 0;
  color: #666;
}
.login-box-body .login-box-msg {
  font-size: 18px;
  padding-left: 0px;
  padding-right: 0px;
  font-weight: 600;
  color: #757575;
}
.login-box-msg,
.register-box-msg {
  margin: 0;
  text-align: center;
  padding: 0 20px 20px 20px;
}
.social-auth-links {
  margin: 10px 0;
}
.text-center {
  text-align: center;
}
.my-logo img {
  /* width: 230px; */
  width: 170px;
  height: auto;
  margin: 0 auto;
  vertical-align: middle;
}
.btn-google {
  color: #fff;
  background-color: #dd4b39;
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
