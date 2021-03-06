import { animateScroll } from "https://cdn.skypack.dev/react-scroll";
import * as reactScrollTop from "https://cdn.skypack.dev/react-scroll-top@1.0.4";


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return ` <a target="_blank" href= "${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: placeholder,
      conversation: [placeholder],
      extendPreview: true,
      text: "Ask me anything!",
      response: "Hmmm, I don't know how to answer that :|",
      secondResponse: "Maybe you should ask another question?",
      finalRespose: "How about you shoot me an email???",
      extendAni: true };

    this.extendPreview = this.extendPreview.bind(this);
    this.extendAni = this.extendAni.bind(this);
    this.enterKey = this.enterKey.bind(this);
    this.respond = this.respond.bind(this);
    this.clickToDelete = this.clickToDelete.bind(this);
    this.onClick = this.onClick.bind(this);


  }
  //Extend 
  extendAni() {
    this.setState({
      extendAni: !this.state.extendAni });

  }

  extendPreview() {
    this.setState({
      extendPreview: !this.state.extendPreview });

  }

  onClick(event) {
    this.extendAni();
    this.extendPreview();
  }

  //clicking Enter
  componentDidMount() {
    document.addEventListener('keydown', this.enterKey);
    let scroller = document.getElementById("preview");
    scroller.scrollTop = scroller.scrollHeight;

  }
  componentDidUpdate() {
    let scroller = document.getElementById("preview");
    scroller.scrollTop = scroller.scrollHeight;
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterKey);
  }

  enterKey(event) {
    if (event.keyCode === 13) {
      this.setState({
        conversation: [...this.state.conversation, event.target.value],
        input: event.target.value,
        text: "" });

    } else
    {
      this.setState({
        text: event.target.value });

    }
  }

  //response
  respond() {
    if (this.state.conversation.length < 3) {
      this.setState({
        conversation: [...this.state.conversation, this.state.response] });

    } else
    if (this.state.conversation.length < 5) {
      this.setState({
        conversation: [...this.state.conversation, this.state.secondResponse] });

    } else
    {
      this.setState({
        conversation: [...this.state.conversation, this.state.finalRespose] });

    }
  }

  clickToDelete() {
    this.setState({
      text: "" });

  }

  render() {
    let icon = this.state.extendPreview ? "fas fa-chevron-up" : "fas fa-chevron-down";
    let previewExt = this.state.extendPreview ? "previewMin" : "previewMax";
    let previewAni = this.state.extendAni ? "extendToMin" : "extendToMax";
    let conversations = this.state.conversation;
    if (conversations.length % 2 == 0) {this.respond();}
    return /*#__PURE__*/(
      React.createElement("div", { id: "mainBody", className: "codingEffect" }, /*#__PURE__*/
      React.createElement(ExtendoBar, { icon: icon, onClick: this.onClick }), /*#__PURE__*/
      React.createElement(ConvoPreviewer, { id: "preview", className: `${previewExt} ${previewAni}`, input: conversations }), /*#__PURE__*/
      React.createElement(StartEditor, { input: this.state.text, onChange: this.enterKey, onClick: this.clickToDelete }), /*#__PURE__*/
      React.createElement("tester", null)));


  }}




const ExtendoBar = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "toolbar" }, /*#__PURE__*/
    React.createElement("i", { className: props.icon, onClick: props.onClick })));


};

const StartEditor = props => {
  return /*#__PURE__*/(
    React.createElement("textarea", { id: "editor", type: "text", value: props.input, onChange: props.onChange, onClick: props.onClick }));

};


const ConvoPreviewer = props => {

  const conversations = props.input.map((convo, i) => i == 0 ? /*#__PURE__*/React.createElement("div", { key: i, dangerouslySetInnerHTML: { __html: marked(convo, { renderer: renderer }) } }) : i % 2 == 1 ? /*#__PURE__*/React.createElement("div", { key: i, className: "listAnswer", dangerouslySetInnerHTML: { __html: marked(convo, { renderer: renderer }) } }) : /*#__PURE__*/React.createElement("div", { key: i, className: "myTypewriter", dangerouslySetInnerHTML: { __html: marked(convo, { renderer: renderer }) } }));
  return /*#__PURE__*/(
    React.createElement("div", { id: props.id, className: props.className, ref: props.ref },
    conversations));


};


const placeholder = `# Hi! My name is Arthur!
## I'm a front-end web developer.

As a self-starter and determined learner.

My life goal is to:

\`\`\`
let myLearning;
while (myAge<= myLifeSpan){
  myLearning += learningOpportunity;
};
\`\`\`

If you would like to learn more about me:

- [LinkedIn](https://www.linkedin.com/in/arthurjlee/)
- [GitHub](https://github.com/arthurlee945)
- [Resume](https://drive.google.com/file/d/1TfP-FeXzATVSXyG7a8VJ-kBq0jjugY1i/view?usp=sharing)
- [Email](mailto:arthurlee945@email.com)

>**You can reach out to me through any of those!**

![my portrait](https://lh3.googleusercontent.com/VkPcXENFuD5ML8k7NUK5YrQEBxiSuXQLyapIlSr4PmLzsIC7DfpoESn-WdkQUctLnC11TwyrCYLT0BcD8Vc7J-UQw85_-3gBWd2515o8E9U4YOsAeRlRJBoCUP5vf3tDYym9wLk5LOtsM2u0JRr7OJN_iJM7ZP38kSSFfPb74N8wrcSyifTh9Izscrw1tI1E1ISIUY2gJC4xm58Q_nVaM2Rna6dtt4MI42hsaLObiat-JH_tlFueP6yWZg-SjcqxiJdVZoaRjQxpSoQesVva5VeKNPuhSkvtI-x-iM-dAQqHu54SlZTEHL1ieLpoZtiRfBkIJvPVtoLYHA8-uvHYH9l2pNjiyUH_h1MqgBIA9LIxUPURZEbZsdybCe1sE22lG8AEu7AgO4rqGf0_lXR3Sm7ZbmbRLbWcFGuuqCz9IWHR0Ul-dD3C-Qw7C9YMH6_2n4RbzJ2HGpSvxi2ofh_IQwl_bwE4bhSLN9fu9vhblgVi-U9jDeP_f1chHI-V4CwhTX7XeJPRjjd_j7yhInH7WWwajyd0I1-wsDUy6D5qyn-57Yc39dY4Qd9ZEaUz1o14-5KR39aPNFl8r9XbU4XIteiTAKUp-PKW_aPCxjXZ1PTRGAngDMfO6He6wruot3IlxMMcUkfEj_Jl9ooStTEaNA5u5paqPO356wGEHL1G3j6XynK_pkQv7iW4rA8s2SmPG_KrcdPArHh0xmUatNAZLy7W=w640-h576-no?authuser=2)

>**If you want to ask something go ahead!**
`;


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
