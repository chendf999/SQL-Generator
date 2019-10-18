function getSQL(){
  // default database
  var database = 'desktop_product_intelligence_public.experiment_data_partitioned_weekly_v2';

  // get product name
  var product =  `
  <li>SELECT *</li>
  <li>FROM ${database}</li>
  <li>AS dataset</li>
  <li>WHERE product_name = '${input_product.value}${input_release.value}'</li>
  `

  // get limit
  var limit = input_limit.value;

  if (limit > 0 && limit <= 5000) {
    limit = `<li>LIMIT ${limit}</li>`
  } else {
    alert('Please enter a number between 1-5000');
    input_limit.value = '';
    return
  }

  // render component
  var component = input_component.value;

  if (component !== '') {
    if (input_comp_waypoint.checked) {
      database = 'desktop_product_usage_public.dap_experiment_details_daily';
      component = `<li>AND component_name = '${input_component.value}'</li>`
    } else {
      database = 'desktop_product_intelligence_public.experiment_data_partitioned_weekly_v2';
      component = `<li>AND dataset.component_attributes['COMMON.COMMAND_NAME'] = '${input_component.value}'</li>`
    }
  }

  output_code.innerHTML = product + component + '<li>ORDER BY dt DESC</li>' + limit;
}
