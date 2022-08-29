import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;

  @tracked currentCompareTo = sessionStorage.getItem('compareTo');
}
