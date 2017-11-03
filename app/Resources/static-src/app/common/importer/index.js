import notify from 'common/notify';
import Progress from './progress';

class Importer {
  constructor(props) {
    Object.assign(this, {
      container: '#importer-app',

      form: '#importer-form',
      confirmEl: '#importer-confirm',
      progressEl: '#importer-progress',
      progressTemplate: '#importer-progress-template',

      verifyBtn: '#import-verify-btn',
      importBtn: '#import-btn',

      rules: {},
      importData: [],
    }, props);

    this.$container = $(this.container);
    this.$form = $(this.form);
    this.$confirmEl = $(this.confirmEl);
    this.$progressEl = $(this.progressEl);
    this.$progressTemplate = $(this.progressTemplate);

    this.init();
  }
  
  init() {
    this.events();
  }

  events() {
    this.$container.on('change', 'input[type=file]', event => this.onSelectFile(event));
    this.$container.on('click', this.verifyBtn, event => this.onVerify(event));
    this.$container.on('click', '.js-reselect', event => this.onReSelect(event));
    this.$container.on('click', this.importBtn, event => this.onImport(event));
  }

  onSelectFile(event) {
    const filename = $(event.currentTarget).val();
    if (filename === '') {
      return;
    }
    this.$container.find('.filename').val(filename);
  }

  onVerify(event) {
    let self = this;
    let validatior = this.$form.validate({
      rules: self.rules,
      submitHandler(form) {
        let $form = $(form);
        let $btn = $(self.importBtn);
        $btn.button('loading');
        
        $.ajax({
          type: 'POST',
          url: $form.attr('action'),
          processData: false,
          contentType: false,
          cache: false,
          data: new FormData($form[0])
        }).done((res) => {
          $btn.button('reset');
          const status = res.status;
          const eventType = 'on' + status.charAt(0).toUpperCase() + status.substr(1);
  
          console.log(eventType);
          self[eventType](res);
        }).fail((res) => {
          $btn.button('reset');
          console.log('error:', res);
        })
      }
    });

    if(validatior.form()) {
      this.$form.submit();
    }
  }

  onReSelect(event) {
    this.$form.show();
    this.$confirmEl.remove();
  }

  onDanger(res) {
    notify(res.status, res.message);
  }

  onError(res) {
    const source = `
      <div id="importer-confirm">
        {{#errors}}<div class="col-md-offset-2">{{error}}</div>{{/errors}}
        <br>
        <div class="col-md-offset-2">
          <a type="button" class="btn btn-primary js-reselect" href="javascript:;">
            ${Translator.trans('重新导入')}
          </a>
        </div>
      </div>
    `;

    const errors = [];
    res.errorInfo.map((item) => {
      errors.push({
        error: item
      });
    });

    const data = {
      errors: errors
    };

    this.addTemplate(source, data);
  }

  onSuccess(res) {
    console.log('res', res);
    let source = `
      <div id="importer-confirm">
        {{#importData}}<div class="col-md-offset-2">{{nickname}}</div><br>{{/importData}}
        <div class="col-md-offset-2">${Translator.trans('校验成功！一共包含')}<b>{{importData.length}}</b>${Translator.trans('条数据')}</div><br>
        <div class="col-md-offset-2">
          <button type="button" class="btn btn-primary" id="import-btn">${Translator.trans('确定导入')}</button>
          <a type="button" class="btn btn-primary js-reselect" href="javascript:;">${Translator.trans('返回')}</a>
        </div>
      </div>
    `;

    this.importData = res.importData;
    this.addTemplate(source, res);
  }

  addTemplate(source, data) {
    const template = Handlebars.compile(source);
    const result = template(data);

    this.$form.hide();
    this.$container.append(result);
  }

  onImport(event) {
    const source = this.$progressTemplate.html();
    const template = Handlebars.compile(source);
    const result = template();
    this.$container.html(result);

    new Progress({
      importData: this.importData,
      $container: this.$container,
    })
  }
}

export default Importer;