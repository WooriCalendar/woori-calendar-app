import React from "react";
import companyLogo from "../assets/logo(ver3).png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <FontAwesomeIcon
      onClick={onClickBtn}
      icon={faArrowRightToBracket}
      beat
      size="2xl"
      style={{ color: "#9aaaac" }}
    />
  );
};
const PrivacyPolicyEn = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        marginTop: "8%",
        marginBottom: "8%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "10%" }}>
        <img
          src={companyLogo}
          alt="Woori. logo"
          style={{ width: "50%", marginBottom: "10%" }}
        />
      </div>
      <div style={{ textAlign: "left" }}>
        <div>
          <h1>Personal information processing policy</h1>
          <div>
            <strong>
              &lt;Woori Calendar&gt; (&apos;www.WooriCalendar.com&apos;
            </strong>
            Hereinafter &apos;Woori Calendar&apos;) establishes and discloses a
            personal information processing policy as follows to protect the
            personal information of the data subject and to handle related
            grievances quickly and smoothly under Article 30 of the Personal
            Information Protection Act.
            <br />
            <br />○ This personal information processing policy will take effect
            on June 1, 2023.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 1 (Purpose of Processing Personal Information)
              </strong>
            </h3>{" "}
            &lt;Woori Calendar&gt; ('www.WooriCalendar.com ' hereinafter
            referred to as 'Woori Calendar') processes personal information for
            the following purposes. The personal information being processed
            will not be used for any purpose other than the following, and if
            the purpose of use is changed, necessary measures will be
            implemented, such as obtaining separate consent under Article 18 of
            the Personal Information Protection Act. <br />
            1. Register and manage membership on the website Personal
            information is processed for the purpose of confirming the intention
            to sign up, maintaining and managing membership qualifications,
            preventing illegal use of services, and checking the consent of the
            legal representative when processing personal information of
            children under the age of 14. <br />
            2. Provision of goods or services Personal information is processed
            for personal authentication purposes.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 2 (Period for processing and holding personal
                information)
              </strong>
            </h3>{" "}
            ① &lt;Woori Calendar&gt; processes and retains personal information
            within the period of personal information retention and use under
            the Act or within the period of personal information retention and
            use agreed upon when collecting personal information from the data
            subject. <br />② The processing and retention period of each
            personal information is as follows. 1 collect personal information
            related to.Retained for the above purpose of use from the same date
            regarding the use.It's used. Grounds for possession: Laws and
            regulations Related Acts: Records of contract or subscription
            withdrawal, etc.: 5 years Reason for exception: Act and subordinate
            statutes
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 3 (items of personal information to be processed)
              </strong>
            </h3>{" "}
            ① &lt;Woori Calendar&gt; is processing the following personal
            information items. 1&lt;Register and manage membership on the
            homepage&gt; Required items: name, date of birth, login ID,
            password, email, access IP information Selections:
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 4 (Matters concerning the processing of personal
                information of children under the age of 14)
              </strong>
            </h3>{" "}
            ① When collecting personal information for children under the age of
            14, the company collects the minimum personal information necessary
            to perform the service with the consent of its legal representative.
            • Mandatory items: name, relationship, contact number of legal
            representative <br />② In addition, when collecting children's
            personal information for the promotion of , separate consent is
            obtained from the legal representative. <br />③ When collecting
            personal information of children under the age of 14, the child may
            be required to have minimum information, such as the name and
            contact number of the legal representative, and check whether the
            legitimate legal representative has agreed in one of the following
            ways. • A method of having a legal representative indicate the
            consent on an Internet site where the consent was posted and
            notifying the personal information controller of the consent by a
            mobile phone text message of the legal representative • Method of
            having a legal representative indicate whether he/she agrees on an
            Internet site where the contents of consent are posted and receiving
            card information such as a credit card or debit card of a legal
            representative • A method of having a legal representative indicate
            whether or not he/she agrees on an Internet site where the contents
            of consent are posted, and verifying the identity of the legal
            representative through personal authentication, etc. of the legal
            representative • To issue a written agreement directly to the legal
            representative, deliver it by mail or fax, and have the legal
            representative submit the agreement after signing it • Method of
            sending an e-mail with the contents of consent and receiving an
            e-mail with the expression of intention of consent from a legal
            representative • A method of informing the legal representative of
            the consent through the phone, providing guidance on how to obtain
            consent or confirm consent, such as an Internet address, and
            obtaining consent through a phone call again • Other methods of
            informing the legal representative of the consent and confirming the
            expression of intention of consent in the same manner as above
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 5 (Matters concerning the provision of personal
                information to third parties)
              </strong>
            </h3>{" "}
            ① &lt;Woori Calendar&gt; processes personal information only within
            the scope specified in Article 1 (Purpose of Processing Personal
            Information), and provides personal information to third parties
            only if it falls under Articles 17 and 18 of the Personal
            Information Protection Act, such as consent of the data subject and
            special provisions of the law. <br />② &lt;Woori Calendar&gt;
            provides personal information to third parties as follows. <br />
            1. &lt;Woori Calendar&gt; Person to whom personal information is
            provided: Woori calendar Purpose of use of personal information of
            the recipient: Name, date of birth, login ID, email, access IP
            information, cookie, access log, service usage record the possession
            of the recipient.Period of use: 5 years
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 6 (Matters concerning the entrustment of personal
                information processing)
              </strong>
            </h3>{" "}
            ① &lt;Woori Calendar&gt; entrusts the following personal information
            processing tasks for smooth personal information processing. 1. &lt;
            &gt; Consignee (Consignee): The contents of the entrusted work:
            Consignment period: <br />② &lt;Woori Calendar&gt; stipulates in
            documents such as contracts that prohibit personal information
            processing, technical and management protection measures,
            restrictions on re-entrustment, management and supervision of the
            trustee, and supervises whether the trustee handles personal
            information safely.
            <br />③ If the contents of the entrusted work or the trustee
            changes, we will disclose it through this personal information
            processing policy without delay.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 7 (Procedure and Method of Destruction of Personal
                Information)
              </strong>
            </h3>{" "}
            ① &lt;Woori Calendar&gt; destroys the personal information without
            delay when personal information becomes unnecessary, such as the
            passage of the personal information retention period and the
            achievement of the purpose of processing. <br />② If the personal
            information period agreed by the data subject has elapsed or the
            purpose of processing has been achieved, the personal information
            shall be transferred to a separate database (DB) or stored
            differently. 1. Legal basis: 2. Personal information items to be
            preserved: account information, transaction date <br />③ The
            procedure and method of destroying personal information are as
            follows. 1. Procedures for Destruction &lt;Woori Calendar&gt;
            selects personal information that has caused the reason for
            destruction and destroys the personal information with the approval
            of &lt;Woori Calendar&gt;'s personal information protection manager.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 8 (Measures concerning the destruction of personal
                information of non-users)
              </strong>
            </h3>{" "}
            <br />① is destroying information about users who have not used the
            service for a year. However, it can be stored and managed separately
            from other users' personal information until the preservation period
            prescribed by other laws and regulations has elapsed. <br />② The
            company notifies users of the fact that personal information is
            destroyed 30 days before the destruction of personal information,
            the expiration date of the period, and the items of personal
            information that are destroyed by e-mail or text message. <br />③ If
            you don't want to destroy your personal information, you can log in
            to the service before the expiration of the period.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 9 (Matters concerning the rights and obligations of the
                information subject and legal representative and the method of
                exercising the rights and obligations thereof)
              </strong>
            </h3>{" "}
            ① The information subject can exercise the right to Woori calendar
            at any time, such as requesting for personal information to be
            viewed, corrected, deleted, and stopped processing. <br />② The
            exercise of rights under paragraph (1) may be conducted in writing,
            e-mail, fax, etc. according to Article 41 (1) of the Enforcement
            Decree of the Personal Information Protection Act, and Woori
            calender will take action without delay. <br />③ The exercise of
            rights under paragraph (1) may be conducted through a legal
            representative of the information subject or an agent, such as a
            person delegated.In this case, "Notification of the method of
            processing personal information (No. 2020-7)" You have to submit a
            power of attorney according to attached Form 11. <br />④ The rights
            of the data subject may be restricted pursuant to Articles 35 (4)
            and 37 (2) of the Personal Information Protection Act. <br />⑤
            Requests for correction and deletion of personal information cannot
            be requested if other laws specify that the personal information is
            subject to collection. <br />⑥ Woori calendar checks whether it is
            you or a legitimate agent who made the request, such as a request
            for access according to the right of the information subject, a
            request for correction and deletion, or a request for suspension of
            processing.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 10 (Matters concerning measures to ensure the safety of
                personal information)
              </strong>
            </h3>{" "}
            &lt;Woori Calendar&gt; is taking the following measures to ensure
            the safety of personal information. <br />
            1. Establishing and implementing an internal management plan We have
            established and implemented an internal management plan for the safe
            processing of personal information. <br />
            2. Encryption of personal information The user's personal
            information is encrypted, stored, and managed, so only you can know
            it, and important data uses separate security functions such as
            encrypting files and transmission data or using file lock functions.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 11 (Matters concerning the installation and operation of
                devices that automatically collect personal information and
                their refusal)
              </strong>
            </h3>{" "}
            Woori calendar does not use "cookie" that stores information on the
            use of the information subject and calls it from time to time.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 12 (Matters concerning collection, use, provision,
                refusal, etc. of behavioral information)
              </strong>
            </h3>{" "}
            Matters concerning the collection, use, provision, refusal, etc. of
            behavioral information does not collect, use, or provide behavioral
            information for online customized advertisements.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 13 (Criteria for determining additional use and
                provision)
              </strong>
            </h3>
            &lt;Woori Calendar&gt; may additionally use and provide personal
            information without the consent of the data subject in consideration
            of the matters under Article 14-2 of the Enforcement Decree of the
            Personal Information Protection Act pursuant to Articles 15 (3) and
            17 (4) of the Personal Information Protection Act. Accordingly, in
            order for &lt;Woori Calendar&gt; to provide additional use and
            provision without the consent of the information subject, the
            following matters were considered.
            <br /> ▶ Whether the purpose of additionally using and providing
            personal information is related to the original purpose of
            collection <br />▶ Whether there is a possibility of predicting
            additional use or provision in light of the circumstances in which
            personal information has been collected or the processing practices
            <br /> ▶ Whether the additional use or provision of personal
            information unfairly infringes on the interests of the data subject
            <br /> ▶ Whether measures necessary for securing safety, such as
            pseudonym processing or encryption, have been taken <br />※ Criteria
            for determining considerations for additional use and provision
            shall be prepared and disclosed autonomously by business
            operators/organizations
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 14 (Matters concerning the processing of pseudonym
                information when processing pseudonym information)
              </strong>
            </h3>{" "}
            &lt;Woori Calendar&gt; processes alias information for the following
            purposes. <br />▶ Purpose of processing pseudonym information - You
            can write it yourself. <br />▶ Processing and retention period of
            pseudonym information - You can write it yourself. <br />▶ Matters
            concerning the provision of pseudonym information to third parties
            (only prepared where applicable) - You can write it yourself. <br />
            ▶ Matters concerning the entrustment of the processing of pseudonym
            information (only prepared where applicable) - You can write it
            yourself. <br />▶ Items of pseudonymized personal information - You
            can write it yourself. <br />▶ Matters concerning measures to secure
            the safety of pseudonym information under Article 28-4 (Obligation
            to Take Safety Measures for pseudonym information, etc.) of the Act
            - You can write it yourself.
            {/* javascript:fnNextStep(); */}
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 15 (Matters concerning the person in charge of personal
                information protection)
              </strong>
            </h3>{" "}
            ① Woori calendar is in charge of personal information processing and
            designates a person in charge of personal information protection as
            follows for handling complaints and damage relief of data subjects
            related to personal information processing. <br />▶ Personal
            Information
            <br /> Protection Officer Name: Kang Tae-su
            <br /> Position: Employee <br />
            Position: Employee <br />
            Contact information: 02-123-456
            <br /> finalwoori@gmail.com <br /> ※ You are connected to the
            department in charge of privacy. <br />▶ Personal Information
            Protection Department Department name: Contact Person: Contact: , ,{" "}
            <br />② The information subject can contact the person in charge of
            personal information protection and the department in charge of all
            personal information protection inquiries, complaints, and damage
            relief that occurred while using Woori calendar's service (or
            business). Woori calendar will respond and handle inquiries from the
            information subject without delay.
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>Article 16 (Designation of Domestic Agents)</strong>
            </h3>{" "}
            The data subject may contact the domestic representative of
            &lt;Woori Calendar&gt; designated pursuant to Article 39-11 of the
            ｢Personal Information Protection Act｣ for personal
            information-related grievance, etc. &lt;Woori Calendar&gt; will try
            to quickly handle the tasks of the person in charge of personal
            information protection, such as handling complaints related to
            personal information of the data subject. <br />▶ &lt;Woori
            Calendar&gt; has designated a domestic agent in accordance with
            Article 39-11 of the ｢Personal Information Protection Act｣. <br />-
            Name of domestic agent: [Name of agent_direct input] (In case of
            corporation, name of representative) <br />- Domestic agent's
            address: [agent's address_direct entry] (in the case of a
            corporation, the location of the business office) <br />- Domestic
            agent's phone number: [Agent's phone number_directly entered] <br />
            - Domestic agent's e-mail address: [agent's e-mail_direct entry]
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 17 (Department that receives and processes requests for
                access to personal information)
              </strong>
            </h3>{" "}
            The data subject may request the following department to view
            personal information under Article 35 of the ｣Personal Information
            Protection Act｢. &lt;Woori Calendar&gt; will try to expedite the
            request for personal information access by the information subject.
            <br />▶ Personal Information Access Request Receipt and Processing
            Department Department name: Contact Person: Contact: , ,
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 18 (Method of remedy for infringement of rights and
                interests of information subjects)
              </strong>
            </h3>{" "}
            In order to receive relief for personal information infringement,
            the information subject may apply for dispute resolution or
            consultation with the Personal Information Dispute Mediation
            Committee, the Korea Internet & Security Agency's Personal
            Information Infringement Reporting Center, etc. In addition, please
            contact the institution below for reports and counseling on other
            personal information infringement. <br />
            1. Personal Information Dispute Mediation Committee: (without
            country number) 1833-6972 (www.kopico.go.kr ) <br />
            2. Personal Information Infringement Reporting Center: (without
            country number) 118 (privacy.kisa.or.kr ) <br />
            3. Supreme Prosecutors' Office: (without national number) 1301
            (www.spo.go.kr ) <br />
            4. National Police Agency: (without country number) 182
            (ecrm.cyber.go.kr ) A person who has been infringed on rights or
            interests due to a disposition or omission made by the head of a
            public institution in response to a request under Articles 35
            (access of personal information), 36 (correction and deletion of
            personal information), and 37 (stopping processing of personal
            information, etc.) may request an administrative trial.
            <br /> ※ For more information on administrative trials, please refer
            to the website of the Central Administrative Appeals Committee
            (www.simpan.go.kr ).
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h3>
              <strong>
                Article 19 (Change of Personal Information Processing Policy)
              </strong>
            </h3>{" "}
            ① This personal information processing policy will take effect on
            June 1, 2023.
            <br /> ② You can check the previous personal information processing
            policy below. <br />
            Example - Apply 20XX.X.X. to 20XX.X. (click)
            <br /> Example - Apply 20XX.X.X. to 20XX.X. (click) <br />
            Example - Apply 20XX.X.X. to 20XX.X. (click)
          </div>
        </div>
        <div style={{ float: "right" }}>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyEn;
