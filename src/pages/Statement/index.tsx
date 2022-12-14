import React, { memo } from 'react';
import styles from './index.less'

const Statement = memo(() => {
  return (
    <div className={styles.statebox}>
      <h2>提示条款</h2>
      <div className={styles.content}>
        "智控管理平台重视用户的隐私。您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。本《隐私政策》与您所使用的智控管理平台服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。您使用或继续使用我们的服务，即意味着同意我们按照本《隐私政策》收集、使用、储存和分享您的相关信息。
        如对本《隐私政策》或相关事宜有任何问题，请通过邮箱或固话与我们联系。"
      </div>
      <h2>我们可能收集的信息</h2>
      <div className={styles.content}>
        我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。
        <h3>您提供的信息</h3>
        <ul>
          <li>
            您在注册账户或使用我们的服务时，向我们提供的相关个人信息或企业信息，例如姓名、身份证件号码、地址、邮箱、个人生物识别信息、电话号码、企业账号名称、企业用户联系人、企业用户联系人电话等；
          </li>
          <li>
            您通过我们的服务向其他方提供的共享信息，以及您使用我们的服务时所储存的信息。
          </li>
        </ul>
        <h3>其他方分享的您的信息</h3>
        其他方使用我们的服务时所提供有关您的共享信息。
        <h3>我们获取的您的信息</h3>
        您使用服务时我们可能收集如下信息：
        <p className={styles.underline}>
          ①
          身份识别信息，包括但不限于您的姓名、身份证件号码、地址、邮箱、个人生物识别信息、电话号码、企业账号名称、企业用户联系人、企业用户联系人电话等；
        </p>
        <p className={styles.underline}>
          ②
          操作信息，包括但不限于您的IP地址、操作系统版本信息、登录记录、指令信息等；
        </p>
        <p className={styles.underline}>
          ③ 日志信息，指您使用我们的服务时，系统可能通过cookies、web
          beacon或其他方式自动采集的技术信息，包括：
        </p>
        <ul>
          <li>
            设备或软件信息，例如您的移动设备、网页浏览器或用于接入我们服务的其他程序所提供的配置信息、您的IP地址和移动设备所用的版本和设备识别码；
          </li>
          <li>
            在使用我们服务时搜索或浏览的信息，例如您使用的网页搜索词语、访问的社交媒体页面url地址，以及您在使用我们服务时浏览或要求提供的其他信息和内容详情
          </li>
          <li>
            有关您曾使用的移动应用（APP）和其他软件的信息，以及您曾经使用该等移动应用和软件的信息；
          </li>
          <li>
            您通过我们的服务进行通讯的信息，例如曾通讯的账号，以及通讯时间、数据和时长；
          </li>
          <li>
            您通过我们的服务进行通讯的信息，例如曾通讯的账号，以及通讯时间、数据和时长；
          </li>
          <li>
            您通过我们的服务分享的内容所包含的信息（元数据），例如拍摄或上传的共享照片或录像的日期、时间或地点等。
          </li>
        </ul>
        <p className={styles.underline}>
          ④
          位置信息，指您开启设备定位功能并使用我们基于位置提供的相关服务时，收集的有关您位置的信息，包括：
        </p>
        <ul>
          <li>
            您通过具有定位功能的移动设备使用我们的服务时，通过GPS或WiFi等方式收集的您的地理位置信息；
          </li>
          <li>
            您或其他用户提供的包含您所处地理位置的实时信息，例如您提供的账户信息中包含的您所在地区信息，您或其他人上传的显示您当前或曾经所处地理位置的共享信息，您或其他人共享的照片包含的地理标记信息；
          </li>
          <li>您可以通过关闭定位功能，停止对您的地理位置信息的收集。</li>
        </ul>
      </div>
      <h2>我们可能如何使用信息</h2>
      <div className={styles.content}>
        我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：
        <ul>
          <li>向您提供服务；</li>
          <li>
            在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；
          </li>
          <li>帮助我们设计新服务，改善我们现有服务；</li>
          <li>
            使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他用户作出其他方面的回应；
          </li>
          <li>向您提供与您更加相关的广告以替代普遍投放的广告；</li>
          <li>评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；</li>
          <li>软件认证或管理软件升级；</li>
          <li>
            让您参与有关我们产品和服务的调查。开展与金蝶云平台服务相关的市场活动，向您推送最新的市场活动信息及优惠方案；
          </li>
          <li>
            协助国家司法、行政、安全机关等权利机构开展调查，并遵守适用法律法规及其他向有权机构承诺之义务；
          </li>
        </ul>
        <div className={styles.underline}>
          为了让您有更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息，以汇集信息或者个性化的方式，用于我们的其他服务。例如，在您使用我们的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项，您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。
        </div>
      </div>
      <h2>您如何访问和控制自己的个人信息</h2>
      <div className={styles.content}>
        我们将尽一切可能采取适当的技术手段，保证您可以访问、更新和更正自己的注册信息或使用我们的服务时提供的其他个人信息。在访问、更新、更正和删除前述信息时，我们可能会要求您进行身份验证，以保障账户安全。
      </div>
      <h2>我们可能分享的信息</h2>
      <div className={styles.content}>
        除以下情形外，未经您同意，我们以及我们的关联公司不会与任何第三方分享您的个人信息：
        我们以及我们的关联公司，可能将您的个人信息与我们的关联公司、合作伙伴及第三方服务供应商、承包商及代理（例如代表我们发出电子邮件或推送通知的通讯服务提供商、为我们提供位置数据的地图服务供应商）分享（他们可能并非位于您所在的法域），用作下列用途：
        <ul>
          <li>向您提供我们的服务；</li>
          <li>实现“我们可能如何使用信息”部分所述目的；</li>
          <li>
            履行我们在《智控管理平台用户使用协议》或本《隐私政策》中的义务和行使我们的权利；
          </li>
          <li>理解、维护和改善我们的服务。</li>
          <li>
            根据法律法规的规定及商业惯例，接受第三方的审计或尽职调查时，可能向其提供您的相关信息。
          </li>
          <li>
            根据法律法规的规定或行政机关、司法机构等有权机关要求，向其提供您的相关信息。
          </li>
        </ul>
        <p>
          如我们或我们的关联公司与任何上述第三方分享您的个人信息，我们将努力确保该等第三方在使用您的个人信息时遵守本《隐私政策》及我们要求其遵守的其他适当的保密和安全措施。
        </p>
        <p>
          随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的个人信息有可能作为此类交易的一部分而被转移。我们将在转移前通知您。
        </p>
        <p>
          我们或我们的关联公司还可能为以下需要而保留、保存或披露您的个人信息：
        </p>
        <ul className={styles.nolist}>
          <li>① 遵守适用的法律法规；</li>
          <li>② 遵守法院命令或其他法律程序的规定；</li>
          <li>③ 遵守相关政府机关的要求；</li>
          <li>
            ④
            为遵守适用的法律法规、维护社会公共利益，或保护我们的客户、我们或我们的集团公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。
          </li>
        </ul>
      </div>
      <h2>信息安全保护</h2>
      <div className={styles.content}>
        <p>
          我们仅在本《隐私政策》所述目的所必需的期间和法律法规要求的时限内保留您的个人信息。
        </p>
        <p>
          我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用数据传输加密（例如SSL）、数据存储加密来保护您提供的个人信息。智控管理平台的供应商、合作伙伴或其他智控管理平台第三方服务商将受到保密协议的约束，同时还将受到数据信息的权限控制和操作监控。但智控管理平台无法保证前述第三方一定会按照我们的要求采取保密措施，我们亦不对第三方的行为及后果承担任何责任，而且请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全，任何安全系统都存在可能的及未知的风险。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。作为用户，您可根据您的意愿决定是否使用智控管理平台的服务，以及是否主动提供您的信息。
        </p>
      </div>
      <h2>您分享的敏感个人信息</h2>
      <div className={styles.content}>
        <p>
          某些个人信息因其特殊性可能被认为是敏感个人信息，例如您的种族、宗教、个人健康和医疗信息等。相比其他个人信息，敏感个人信息受到更加严格的保护。
        </p>
        <p>
          请注意，您在使用我们的服务时所提供、上传或发布的内容和信息（例如有关您社交活动的照片等信息），可能会泄露您的敏感个人信息。您需要谨慎地考虑，是否在使用我们的服务时披露相关敏感个人信息。
        </p>
        <p>您同意按本《隐私政策》所述的目的和方式来处理您的敏感个人信息。</p>
      </div>
      <h2>隐私政策的适用例外</h2>
      <div className={styles.content}>
        <p>
          我们的服务可能包括或链接至第三方提供的社交媒体或其他服务（包括网站）。例如：
        </p>
        <ul>
          <li>
            您利用
            “分享”键将某些内容分享到我们的服务，或您利用第三方连线服务登录我们的服务。这些功能可能会收集您的相关信息（包括您的日志信息），并可能在您的电脑装置cookies，从而正常运行上述功能；
          </li>
          <li>
            我们通过广告或我们服务的其他方式向您提供链接，使您可以接入第三方的服务或网站。
          </li>
        </ul>
        该等第三方社交媒体或其他服务可能由相关的第三方或我们运营。您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何个人信息），须受该第三方的服务条款及隐私政策（而非《通用服务条款》或本《隐私政策》）约束，您需要仔细阅读其条款。本《隐私政策》仅适用于我们所收集的信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，我们对任何第三方使用由您提供的信息不承担任何责任。
      </div>
      <h2>变更</h2>
      <div className={styles.content}>
        我们可能适时修订本《隐私政策》的条款，该等修订构成本《隐私政策》的一部分。如该等修订造成您在本《隐私政策》下权利的实质减少，我们将在修订生效前通过在主页上显著位置提示或向您发送电子邮件或以其他方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本《隐私政策》的约束。
      </div>
    </div>
  );
});

export default Statement;
