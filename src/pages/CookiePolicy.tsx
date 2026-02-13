
import PolicyLayout from "@/components/layout/PolicyLayout";

const CookiePolicy = () => {
  const sections = [
    { id: "what-are-cookies", title: "1. What Are Cookies" },
    { id: "how-we-use", title: "2. How We Use Cookies" },
    { id: "cookies-we-set", title: "3. The Cookies We Set" },
    { id: "third-party", title: "4. Third Party Cookies" },
    { id: "disabling", title: "5. Disabling Cookies" },
    { id: "more-info", title: "6. More Information" },
  ];

  return (
    <PolicyLayout
      title="Cookie Policy"
      sections={sections}
    >
      <section id="what-are-cookies" className="scroll-mt-24">
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>
      </section>

      <section id="how-we-use" className="scroll-mt-24">
        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
        </p>
      </section>

      <section id="cookies-we-set" className="scroll-mt-24">
        <h2>3. The Cookies We Set</h2>
        <ul>
          <li>
            <strong>Account related cookies:</strong> If you create an account with us, then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.
          </li>
          <li>
            <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
          </li>
          <li>
            <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
          </li>
        </ul>
      </section>

      <section id="third-party" className="scroll-mt-24">
        <h2>4. Third Party Cookies</h2>
        <p>
          In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
        </p>
        <ul>
          <li>
            This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
          </li>
        </ul>
      </section>

      <section id="disabling" className="scroll-mt-24">
        <h2>5. Disabling Cookies</h2>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
        </p>
      </section>

      <section id="more-info" className="scroll-mt-24">
        <h2>6. More Information</h2>
        <p>
          Hopefully that has clarified things for you. As was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
        </p>
        <p className="mt-4">
          However, if you are still looking for more information, you can contact us through one of our preferred contact methods:
        </p>
        <div className="mt-4 p-6 bg-gray-50 rounded-lg">
          <p className="font-bold text-[#1C244B]">SellSync Support</p>
          <p>Email: support@sellsync.com</p>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default CookiePolicy;
