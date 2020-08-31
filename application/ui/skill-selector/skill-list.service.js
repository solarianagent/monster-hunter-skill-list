import {skillSearchService} from './skill-search.service.js';

/**
 * @property {Set<string>} skillList;
 */
class SkillListService {
  skillList = new Set(); 

  /**
   * Adds a skill to the skill list if it exists
   * @param {string} skillName - name of the skill to add
   */
  async addSkill(skillName) {
    const foundSkill = await skillSearchService.getSkill(skillName);

    if (foundSkill) {
      throw new Error('Unable to find specific skill');
    } else {
      this.skillList = this.skillList.add(foundSkill);
    }
  }
}

export const skillListService = new SkillListService();