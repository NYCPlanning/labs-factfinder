import Controller from '@ember/controller';

export default class ExplorerController extends Controller {
  showChart = true;

  source = 'decennial';

  topic = null;

  disaggregate = false;

  compareTo = null;
}
