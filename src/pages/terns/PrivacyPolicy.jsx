import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./terms.css";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="container terms">
        <h2>PRIVACY POLICY</h2>
        <div className="terms__wrapper">
          <div className="agreement">
            <h4>What type of information do we collect?</h4>
            <p>
              We receive, collect, and store any information you enter on our
              website or provide us in any of our platforms. In addition, we
              collect the Internet protocol (IP) address used to connect your
              computer to the Internet; login; e-mail address; password;
              computer and connection information and purchase history. We may
              use software tools to measure and collect session information,
              including page response times, length of visits to certain pages,
              page interaction information, and methods used to browse away from
              the page. We also collect personally identifiable information
              (including name, email, password, communications); payment details
              (including credit card information), comments, feedback, product
              reviews, recommendations, and personal profile.
              <br />
              <br />
            </p>
          </div>

          <div className="agreement">
            <h4>How do we collect information?</h4>
            <p>
              When you visit our website, as part of the process, we collect
              personal information you give us such as your name, address, and
              email address. Your personal information will be used for the
              specific reasons stated below only.
            </p>
          </div>

          <div className="agreement">
            <h4>Why do we collect such information?</h4>
            <p>
              We collect Non-personal and Personal Information for the following
              purposes:
            </p>
            <p> To provide and operate the Services;</p>
            <p>
              To provide our Users with ongoing customer assistance and
              technical support;
            </p>
            <p>
              To be able to contact our Visitors and Users with general or
              personalized service-related notices and promotional messages;
            </p>
            <p>
              To create aggregated statistical data and other aggregated and/or
              inferred Non-personal Information, which we or our business
              partners may use to provide and improve our respective services; 
            </p>
            <p>To comply with any applicable laws and regulations.</p>
          </div>

          <div className="agreement">
            <h4>
              How do we store, use, share and disclose your personal
              information?
            </h4>
            <p>
              ​Purple Pages will only disclose your personal information in the
              event it is required to do so by law, rule, regulation, law
              enforcement agency, governmental official, legal authority or
              similar requirements or when Purple Pages, in its sole discretion,
              deems it necessary in order to protect its rights or the rights of
              others, to prevent harm to persons or property, to fight fraud and
              credit risk, or to enforce or apply the Terms and Conditions.
              Purple Pages may also disclose or transfer User’s personal and
              other information, to a third party as part of reorganization or a
              sale of the assets of a Purple Pages division or company. Any
              third party to whom Purple Pages transfers or sells its assets to
              will have the right to continue to use the personal and other
              information that Users provide to us, in accordance with the Terms
              and Conditions. To the extent necessary to provide Users with the
              Services, Purple Pages may provide their personal information to
              third party contractors who work on behalf of or with Purple Pages
              to provide Users with such Services, to help Purple Pages
              communicate with Users or to maintain the Platforms. Generally,
              these contractors do not have any independent right to share this
              information, however certain contractors who provide services to
              us, including the providers of online communications services,
              will have rights to use and disclose the personal information
              collected in connection with the provision of the Services in
              accordance with their own privacy policies.
            </p>
          </div>

          <div className="agreement">
            <h4>How do we communicate with you?</h4>
            <p>
              We may contact you to notify you regarding your account, to
              troubleshoot problems with your account, to resolve a dispute, to
              collect fees or monies owed, to poll your opinions through surveys
              or questionnaires, to send updates about our Services, or as
              otherwise necessary to contact you to enforce our User Agreement,
              applicable national laws, and any agreement we may have with you.
              For these purposes we may contact you via email, telephone, text
              messages, and postal mail.
            </p>
          </div>

          <div className="agreement">
            <h4>How can you withdraw your consent?</h4>
            <p>
              If you don’t want us to process your data anymore, please contact
              us at: or send us mail to:
            </p>
          </div>

          <div className="agreement">
            <h4>Privacy policy updates</h4>
            <p>
              We reserve the right to modify this privacy policy at any time, so
              please review it frequently. Changes and clarifications will take
              effect immediately upon their posting on the website. If we make
              material changes to this policy, we will notify you here that it
              has been updated, so that you are aware of what information we
              collect, how we use it, and under what circumstances, if any, we
              use and/or disclose it. 
            </p>
          </div>

          <div className="agreement">
            <h4>Questions and updates on your contact information</h4>

            <p>
              If you would like to: access, correct, amend, or delete any
              personal information we have about you, you are invited to contact
              us at: or send us mail to:{" "}
              <a href="mailto:hello@usepurplepages.com">
                hello@usepurplepages.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
