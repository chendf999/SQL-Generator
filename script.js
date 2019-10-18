// default database
var database = 'desktop_product_intelligence_public.experiment_data_partitioned_weekly_v2';
var product;
var component;
var limit;

function getSQL(){
  getComponent();
  getProductAndDB();
  getLimit();
  output_code.innerHTML = product + component + limit;
}

function getProductAndDB(){
  product =  `
  <li>SELECT *</li>
  <li>FROM ${database}</li>
  <li>AS dataset</li>
  <li>WHERE product_name = '${input_product.value}${input_release.value}'</li>
  `
}

function getComponent(){
  component = input_component.value;

  if (component !== '') {
    if (input_comp_waypoint.checked) {
      database = 'desktop_product_usage_public.dap_experiment_details_daily';
      component = `<li>AND component_name = '${input_component.value}'</li>`;
    } else {
      database = 'desktop_product_intelligence_public.experiment_data_partitioned_weekly_v2';
      component = `<li>AND dataset.component_attributes['COMMON.COMMAND_NAME'] = '${input_component.value}'</li>`
    }
  }
}

function getLimit(){
  limit = input_limit.value;

  if (limit > 0 && limit <= 5000) {
    limit = `<li>LIMIT ${limit}</li>`
  } else {
    alert('Please enter a number between 1-5000');
    input_limit.value = '';
    return
  }
}
