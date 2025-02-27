import React from "react";
import "./Footer.css";

import DemoLogo from "../../assets/images/demo-logo.webp";

const Footer = () => {
  return (
    <div class="mainfooter">
      <div class="mainfooter-upper">
        <div class="mainfooter-upper-left">
          <div className="mainfooter-upper-left-up">
            <img src={DemoLogo} alt="" />
            <h4>Training and Placement Cell</h4>
          </div>
          <div className="mainfooter-upper-left-mid">
            <h4>
              <i className="fa-solid fa-phone"></i> Call Us
            </h4>
            <h5>9102581472</h5>
          </div>
          <div className="mainfooter-upper-left-down">
            <h4>
              <i className="fa-solid fa-location-dot"></i> Find Us
            </h4>
            <h5>
              UIT RGPV Shivpuri, Satanwanda Kalan, Shivpuri, Madhya Pradesh
            </h5>
          </div>
          <div class="mainfooter-lower-left">
            <h5>
              <i class="fa-solid fa-copyright"></i> HaNaKoRa 2025
            </h5>
          </div>
        </div>
        <div class="mainfooter-upper-right">
          <h2>Talk with Us !!</h2>
          <form class="row g-3 needs-validation form" novalidate>
            <div class="col-md-6">
              <label for="validationCustom01" class="form-label">
                First name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom01"
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustom02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom02"
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustom02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom03"
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustom02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom04"
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-12">
              <label for="validationCustom02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom05"
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class="col-12">
              <button class="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
